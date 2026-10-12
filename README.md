# Yavuzhan Önder — Portfolyo

3D ve 2D çalışmalarımı içeren kişisel portfolyom. Blender ve Photoshop çalışmalarını büyük görseller, çalışmaya göre değişen renkler ve animasyonlu geçişlerle sunar.

- Türkçe ve İngilizce arayüz
- 15 adet 3D çalışma görseli ve 4 adet 2D çalışma
- Uygun çalışmalarda isteğe bağlı 3D görüntüleme
- İmlecin bulunduğu bölgeye scroll ile yakınlaştırma
- Masaüstü ve mobil uyumlu tasarım
- 3D/2D koleksiyonlar için yansımalı yatay galeri
- Scroll ve sürükleme hızına göre 180–550 ms arasında değişen kart geçişleri
- Ekran yüksekliğine göre kesilmeden sönen yansımalar ve daha uzak galeri görünümü
- Koyu petrol ve kahve tonlarıyla sinematik motion marka kiti
- Yumuşak görsel geçişleri, kısa metinler ve tamamen sessiz etkileşim
- Azaltılmış hareket tercihine uyum ve 3D sürükleme sonrası yumuşak kamera dönüşü

Neon sokak görsel olarak yer alır; bu çalışma için 3D görüntüleme yoktur. Katana ve kın modeli orijinal doku haritalarıyla hazırlanmıştır.

## Yerel önizleme

Bu klasörde `python -m http.server 8765` komutunu çalıştırıp tarayıcıda `http://localhost:8765/` adresini açın. Kurulum veya derleme gerekmez. 3D modeller yalnızca “3D görüntüle” düğmesine basıldığında yüklenir.

## Dosyalar

`index.html` ana sayfadır. `assets/` web görselleri, betikler, stiller ve hafif GLB modellerini içerir. `images/` çalışma görsellerini içerir. Blender kaynakları bu depoya dahil değildir.

Arayüz animasyonları tarayıcının Web Animations API özelliğini kullanır. 3D görüntüleyici model-viewer kütüphanesinin lisansı `assets/vendor/` klasöründedir. Önceki sürümün Motion dosyaları ve lisansı da bu klasörde korunur.
