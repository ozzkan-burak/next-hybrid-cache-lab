# ⚡ Next.js Hybrid Cache Lab: Static Shell + Dynamic Holes

Bu proje, Next.js (App Router) kullanarak **"Partial Prerendering" (PPR)** ve **"Hybrid Caching"** mimarilerini simüle eden deneysel bir e-ticaret laboratuvarıdır.

## Projenin Amacı
Geleneksel web geliştirmede genellikle iki uç nokta vardır:
1.  **Tamamen Statik (SSG):** Çok hızlıdır ama veri bayat olabilir (Örn: Stok bilgisi).
2.  **Tamamen Dinamik (SSR):** Veri günceldir ama her istekte sunucu yorulur ve yavaştır.

Bu projede **üçüncü bir yol** izliyoruz:
Sayfanın %80'ini (Ürün detayları, resimler) **Statik (Cache)** olarak sunarken, %20'sini (Fiyat, Stok) **Dinamik (No-Cache)** olarak sunarak hem hızı hem de güncelliği aynı anda sağlıyoruz.

## Mimari Yaklaşım: "Static Shell"

Sayfa, bir "kabuk" (shell) ve içindeki "delikler" (holes) olarak düşünülür.

* ** Static Shell:** Build anında oluşturulur. CDN'den anında döner. (Header, Footer, Ürün Açıklaması, Görseller)
* ** Dynamic Holes:** Kullanıcı sayfayı istediği an sunucuda hesaplanır. (Fiyat, Stok, Kişiye Özel İndirimler)

### Mimari Diyagramı

```mermaid
graph TD
    subgraph Client [Browser]
        UI[User Interface]
    end

    subgraph Server [Next.js Server]
        Shell[ Static Shell<br/>(Cache HIT)]
        Dynamic[ Dynamic Components<br/>(No-Store)]
    end

    subgraph Data [Data Sources]
        DB[(Product DB)]
        PriceAPI{Price Service}
        StockAPI{Stock Service}
    end

    %% Akışlar
    UI -->|1. Request Page| Server
    Shell -.->|Build Time| DB
    Server -->|2. Return Instant HTML| UI
    
    Dynamic -->|Runtime| PriceAPI
    Dynamic -->|Runtime| StockAPI
    
    Dynamic -.->|3. Stream Data| UI
    
    style Shell fill:#e8f5e9,stroke:#2e7d32,color:#000
    style Dynamic fill:#ffebee,stroke:#c62828,color:#000
```

sequenceDiagram
    participant User
    participant Edge as CDN / Edge Cache
    participant Server as Next.js Server
    participant DB as Database/API

    Note over User, DB: ⚡ HYBRID REQUEST FLOW
    
    User->>Edge: GET /product/sneakers-123
    
    rect rgb(240, 255, 240)
        Note over Edge: 🟢 STATIC PART (Instant)
        Edge-->>User: Return HTML Shell (Nav, Layout, Images)
        Note right of User: Kullanıcı sayfayı anında görür (FCP)
    end
    
    rect rgb(255, 240, 240)
        Note over Server: 🔴 DYNAMIC PART (Streaming)
        Edge->>Server: Execute Dynamic Holes
        par Fetch Live Data
            Server->>DB: Get Live Price
            Server->>DB: Get Real-time Stock
        end
        DB-->>Server: Data Received
        Server-->>User: Stream <Suspense> Content (Price & Stock)
        Note right of User: Fiyat ve Stok kutuları yüklenir (LCP)
    end

Kullanılan Teknolojiler
Framework: Next.js 15 (App Router)

Architecture: React Server Components (RSC)

Streaming: React Suspense & Streaming SSR

Styling: Tailwind CSS

Language: TypeScript

Laboratuvar Senaryoları
Bu repo üzerinde şu senaryolar test edilecektir:

The Shell Strategy: layout.tsx ve ürün açıklamasını statik hale getirmek.

The Holes: Fiyat ve Stok bileşenlerini cookies() veya no-store ile dinamik hale getirmek.

Artificial Delay: Dinamik kısımlara yapay gecikme ekleyerek "Streaming" efektini gözlemlemek.
