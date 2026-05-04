import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Дрель ударная Makita HP1630",
        category: "Электроинструмент",
        price: 5999,
        oldPrice: 7999,
        rating: 4.7,
        reviews: 234,
        inStock: true,
        image: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/dreli-elektricheskie/730876/2400x1600/52170184.jpg",
        description: "Мощная ударная дрель для сверления отверстий в дереве, металле и бетоне.",
        specifications: {
          "Мощность": "710 Вт",
          "Число оборотов": "3200 об/мин",
          "Тип патрона": "Ключевой",
          "Макс. диаметр сверления (бетон)": "16 мм",
          "Вес": "1.8 кг"
        }
      },
      {
        id: 2,
        name: "Шуруповёрт Bosch GSR 120-LI",
        category: "Электроинструмент",
        price: 4599,
        oldPrice: 5999,
        rating: 4.8,
        reviews: 189,
        inStock: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTKTwPuBp0fUfjAi6xO_DJvXtXOrU-93pBpw&s",
        description: "Аккумуляторный шуруповёрт для быстрого закручивания шурупов и сверления.",
        specifications: {
          "Напряжение": "12 В",
          "Ёмкость аккумулятора": "1.5 Ач",
          "Крутящий момент": "30 Нм",
          "Вес": "0.9 кг"
        }
      },
      {
        id: 3,
        name: "Набор инструментов 98 предметов",
        category: "Наборы инструментов",
        price: 8999,
        oldPrice: 12999,
        rating: 4.5,
        reviews: 156,
        inStock: true,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTvAxCeD8U8zH7acwJYpHERDBvkS-_CN3PweP8IguKol7NL8GC2z3MfIa07p0cjw74F62G1F45Egp8EnGzAAqH6R9A1QCq8HwRkJPK767wEFqEwWb3ZUHC7",
        description: "Универсальный набор для дома и автомобиля из 98 предметов.",
        specifications: {
          "Количество предметов": "98",
          "Материал кейса": "Пластик",
          "Гарантия": "2 года"
        }
      },
      {
        id: 4,
        name: "Лазерный уровень Bosch PCL 10",
        category: "Измерительный инструмент",
        price: 3499,
        oldPrice: 4499,
        rating: 4.6,
        reviews: 89,
        inStock: false,
        image: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/izmeritelnye-pribory-i-instrument/54889/560x504/51059732.jpg",
        description: "Лазерный уровень для точной разметки и выравнивания.",
        specifications: {
          "Дальность": "10 м",
          "Точность": "±0.5 мм/м",
          "Питание": "2 x AA",
          "Вес": "0.3 кг"
        }
      },
      {
        id: 5,
        name: "Перфоратор DeWALT D25133K",
        category: "Электроинструмент",
        price: 12999,
        oldPrice: 16999,
        rating: 4.9,
        reviews: 312,
        inStock: true,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQkj5wOrDpwTn78s9ZcyHlBwqDpMrmA87ZONIcAH5WfBX1VhJnVhd8aQyvb_jbIC_qyCc-R8F93DNfIGasd32pZORvJl6syTAonixWZZEE0",
        description: "Профессиональный перфоратор для тяжёлых работ.",
        specifications: {
          "Мощность": "800 Вт",
          "Энергия удара": "2.6 Дж",
          "Тип патрона": "SDS-plus",
          "Вес": "2.6 кг"
        }
      },
      {
        id: 6,
        name: "Болгарка Makita GA5030",
        category: "Электроинструмент",
        price: 4599,
        oldPrice: 5999,
        rating: 4.7,
        reviews: 201,
        inStock: true,
        image: "https://cdn.stroylandiya.ru/upload/iblock/e49/3amoc7685fzw81xw2u90f5sr0ot8oj3c.jpg",
        description: "Угловая шлифовальная машина для резки и шлифовки различных материалов.",
        specifications: {
          "Диаметр диска": "125 мм",
          "Мощность": "840 Вт",
          "Число оборотов": "11000 об/мин",
          "Вес": "1.8 кг"
        }
      }
    ],
    cart: [],
    filters: {
      category: '',
      priceRange: [0, 20000],
      searchQuery: '',
      inStockOnly: false
    }
  }),
  
  getters: {
    filteredProducts: (state) => {
      let filtered = state.products
      
      if (state.filters.category) {
        filtered = filtered.filter(p => p.category === state.filters.category)
      }
      
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
        )
      }
      
      if (state.filters.inStockOnly) {
        filtered = filtered.filter(p => p.inStock)
      }
      
      filtered = filtered.filter(p => 
        p.price >= state.filters.priceRange[0] && 
        p.price <= state.filters.priceRange[1]
      )
      
      return filtered
    },
    
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.id)
        return total + (product ? product.price * item.quantity : 0)
      }, 0)
    },
    
    cartCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    }
  },
  
  actions: {
    addToCart(productId) {
      const existingItem = this.cart.find(item => item.id === productId)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ id: productId, quantity: 1 })
      }
    },
    
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
    },
    
    updateQuantity(productId, quantity) {
      const item = this.cart.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    
    clearCart() {
      this.cart = []
    }
  }
})