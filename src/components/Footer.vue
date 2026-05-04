<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>🔧 StarkovStroy</h3>
          <p>Интернет-магазин инструментов для дома</p>
        </div>
        
        <div class="footer-section">
          <h4>Покупателям</h4>
          <ul>
            <li><a href="#">Каталог</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Контакты</h4>
          <ul>
            <li>📞 8-800-555-35-35</li>
            <li>✉️ info@starkovstroy.ru</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1a1a2e;
  color: white;
  padding: 40px 0 20px;
  width: 100vw; /* на всю ширину экрана */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.footer-section h3 {
  color: #ff6600;
  margin-bottom: 15px;
}

.footer-section h4 {
  margin-bottom: 15px;
  color: #ff6600;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
  color: #999;
}

.footer-section ul li a {
  color: #999;
  text-decoration: none;
}

.footer-section ul li a:hover {
  color: #ff6600;
}
</style>