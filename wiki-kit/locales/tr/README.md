# wiki-kit

Bir LLM tarafından sürdürülmek üzere tasarlanmış Markdown tabanlı bir bilgi tabanı şablonu.

Her soru için ham materyalleri yeniden aramak yerine, LLM `wiki/` içinde özetler, çapraz referanslar ve analizler biriktirerek zaman içinde kalıcı bir bilgi katmanı oluşturur.

Bu şablon, karpathy'nin "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" gist'inde önerilen iş akışını uygular.

## Hızlı Başlangıç

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Ardından:

1. `wiki/overview.md` içinde araştırmak istediğiniz şeyi açıklayın
2. Kaynak materyalleri `raw/sources/` içine bırakın
3. LLM'den `CLAUDE.md` dosyasını okuyup bunları içeri aktarmasını isteyin

## LLM Ne Yapar

`CLAUDE.md` temel alındığında, LLM tanımlı bir iş akışını izler:

- **İçeri aktarma**: Bir ham kaynağı okur, `wiki/sources/` içinde bir özet oluşturur, ilgili kavram ve varlık sayfalarını günceller, ardından çalışmayı `index.md` ve `log.md` içine kaydeder.
- **Sorgu**: Önce wiki'ye bakar, kanıta dayalı yanıt verir ve yeniden kullanılabilir analizleri `wiki/syntheses/` içine kaydeder.
- **Lint**: Çelişkiler, eskimiş içerikler, yetim sayfalar ve yükseltilmemiş önemli kavramlar için wiki'yi düzenli olarak gözden geçirir.

## Dizin Yapısı

Kurulumdan sonra oluşturulan proje şu şekilde görünür:

```text
my-wiki/
├── CLAUDE.md              # LLM için işletim kuralları
├── AGENTS.md              # Diğer ajanları CLAUDE.md dosyasına yönlendirir
├── README.md
├── raw/
│   ├── sources/           # Makaleler, PDF'ler, notlar, dökümler vb.
│   └── assets/            # Görseller, diyagramlar, ekler
├── wiki/
│   ├── overview.md        # Tema, amaç, hipotezler
│   ├── index.md           # İçerik tabanlı dizin
│   ├── log.md             # Tüm işlemlerin kronolojik kaydı
│   ├── open-questions.md  # Çözülmemiş sorular ve araştırma adayları
│   ├── sources/           # Ham materyal başına bir özet sayfası
│   ├── concepts/          # Tekrarlanan temalar, tartışmalar, terminoloji
│   ├── entities/          # İnsanlar, şirketler, ürünler, kuruluşlar
│   ├── syntheses/         # Karşılaştırmalar, analizler, yeniden kullanılabilir sonuçlar
│   └── maintenance/
│       └── lint-reports/  # Periyodik inceleme raporları
└── templates/             # LLM için sayfa yapısı referansları
```

## Yerelleştirmeler

Bu şablon 14 yerel dil paketiyle gelir. `--locale` seçeneği `CLAUDE.md`, şablonlar, wiki iskeleti ve tüm README dosyalarının dilini seçer. Varsayılan değer `en`'dir.
Depo kökündeki bu `README.md`, şablonun kendisini açıklar. Oluşturulan projeler, `locales/en/README.md` veya `locales/ja/README.md` gibi seçilen yerel paket README'sini almalıdır.

| Code | Language    | Code | Language    |
|------|-------------|------|-------------|
| `de` | German      | `ko` | Korean      |
| `en` | English     | `pt` | Portuguese  |
| `es` | Spanish     | `ru` | Russian     |
| `fr` | French      | `th` | Thai        |
| `id` | Indonesian  | `tr` | Turkish     |
| `it` | Italian     | `vi` | Vietnamese  |
| `ja` | Japanese    | `zh` | Chinese     |

```bash
npx create-wiki-kit my-wiki --locale ja
```

Yeni bir yerel paket eklemek için, şablon deposunda `locales/<code>/` oluşturun ve 22 dosyanın tamamının çevrilmiş sürümlerini ekleyin.

## Örnek İstemler

### Başlatma

```text
CLAUDE.md dosyasını oku ve bu wiki'nin amacını ve işletim kurallarını anla.
Sonra wiki/overview.md dosyasını kontrol et ve eksikleri doldurmak için gerekli en az soruları hazırla.
```

### İçeri Aktarma

```text
CLAUDE.md dosyasını izleyerek raw/sources/ içindeki henüz içeri aktarılmamış bir materyali işle.
Bir kaynak özeti oluştur, gerekirse concepts / entities / overview dosyalarını güncelle,
ardından index.md ve log.md dosyalarını güncelle.
```

### Sorgu

```text
Önce wiki/index.md dosyasını oku, sonra wiki içindeki ilgili sayfalara bak.
Bu konudaki üç ana argümanı özetle ve kanıtın zayıf olduğu yerleri belirt.
Sonuç yeniden kullanım değeri taşıyorsa syntheses içine kaydet.
```

### Lint

```text
CLAUDE.md dosyasını izleyerek tüm wiki üzerinde lint çalıştır.
Çelişkileri, eskimiş içeriği, yetim sayfaları, yükseltilmemiş anahtar kavramları
ve araştırma adaylarını belirle. wiki/maintenance/lint-reports/ içine bir rapor oluştur,
ardından index.md ve log.md dosyalarını güncelle.
```

## Temel İlkeler

- `raw/` LLM için salt okunurdur; materyalleri insanlar ekler, LLM bunları asla değiştirmez
- `wiki/` LLM'nin büyüttüğü bilgi katmanıdır; özetler ve çapraz referanslar burada birikir
- Her işlemde `index.md` ve `log.md` güncellenir
- Yüksek değerli sorgu sonuçları konuşmada bırakılmak yerine `syntheses/` içine kaydedilir
- Düzenli lint çalıştırmaları, çelişkileri ve boşlukları büyümeden yakalar

## Diğer Ajanlarla Kullanım

İşletim kuralları `CLAUDE.md` içinde tanımlanır. `AGENTS.md` dosyasını okuyan ajanlar için (örneğin Codex), bu dosya `CLAUDE.md` dosyasına yönlendirir. Gerekirse içeriği ajanın kendi yapılandırma biçimine kopyalayın.
