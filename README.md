# ⚡ Next.js Hybrid Cache Lab: Static Shell + Dynamic Holes

Bu proje, Next.js (App Router) kullanarak **"Partial Prerendering" (PPR)** mimarisini simüle eden ve **"Streaming SSR"** yeteneklerini uç sınırlarda test eden bir laboratuvar çalışmasıdır.

## Projenin Amacı

Modern web uygulamalarında "Veri Güncelliği" (Freshness) ile "Yükleme Hızı" (Performance) genellikle birbiriyle çelişir. Bu projede şu mimariyi uyguladık:

1.  **Static Shell (Anında Yükleme):** Sayfanın iskeleti, başlığı ve layout'u sunucudan milisaniyeler içinde gelir.
2.  **Dynamic Holes (Streaming):** Fiyat ve Stok gibi ağır veriler, sayfa yüklendikten sonra açık HTTP bağlantısı üzerinden "akar" (Stream).
3.  **Visual Feedback Control:** Next.js'in "Soft Navigation" davranışını manipüle ederek, kullanıcıya her güncellemede Loading Skeleton'ları göstermeyi zorunlu kıldık.

## Mimari Yaklaşım

Sayfa iki ana katmandan oluşur:

- **Static Shell:** `fakeDb`'den senkron veri çeker. Bloklamaz. Anında render olur.
- **Dynamic Holes:** `api.ts` içindeki yapay gecikmeli (2s - 3.5s) servisleri bekler. `Suspense` ile sarmalanmıştır.

### Mimari Diyagramı

```mermaid
graph TD
    subgraph Browser [Client / Browser]
        UI[User Interface]
    end

    subgraph NextServer [Next.js Server]
        Shell["Static Shell<br/>(Instant Render)"]
        Stream1["Price Component<br/>(2000ms Delay)"]
        Stream2["Stock Component<br/>(3500ms Delay)"]
    end

    UI -->|1. Request Page| NextServer
    NextServer -->|2. Send HTML Head & Shell| UI

    NextServer -.->|3. Stream Price Data| Stream1
    NextServer -.->|4. Stream Stock Data| Stream2

    Stream1 -.->|Socket Push| UI
    Stream2 -.->|Socket Push| UI

    style Shell fill:#e8f5e9,stroke:#2e7d32,color:#000
    style Stream1 fill:#ffebee,stroke:#c62828,color:#000
    style Stream2 fill:#ffebee,stroke:#c62828,color:#000
```
