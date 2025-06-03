import {Product, Category} from '../types';

export const categories: Category[] = [
  {
    id: "Điện thoại & Phụ kiện",
    name: "Điện thoại & Phụ kiện",
    image: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Điện thoại thông minh, ốp lưng, sạc, tai nghe, pin dự phòng từ các thương hiệu hàng đầu.",
    featured: true
  },
  {
    id: "Máy tính & Laptop",
    name: "Máy tính & Laptop",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Laptop, PC, linh kiện (CPU, RAM, SSD), chuột, bàn phím, màn hình chất lượng cao.",
    featured: true
  },
  {
    id: "Thiết bị âm thanh",
    name: "Thiết bị âm thanh",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Loa Bluetooth, tai nghe true wireless, soundbar, micro cho trải nghiệm âm thanh sống động.",
    featured: true
  },
  {
    id: "Máy ảnh & Thiết bị quay phim",
    name: "Máy ảnh & Thiết bị quay phim",
    image: "http://localhost:80/api/v1/files/143cec1b-bf17-4829-8951-5cf9eda97d91",
    description: "Máy ảnh DSLR, mirrorless, drone, camera hành trình, phụ kiện chụp ảnh.",
    featured: false
  },
  {
    id: "Thiết bị chơi game",
    name: "Thiết bị chơi game",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Console (PS5, Xbox), ghế gaming, tay cầm, kính VR cho game thủ.",
    featured: false
  },
  {
    id: "Phụ kiện công nghệ khác",
    name: "Phụ kiện công nghệ khác",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Ổ cứng ngoài, thẻ nhớ, USB, thiết bị VR/AR, sạc dự phòng đa năng.",
    featured: false
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    price: 29.99,
    description: "Điện thoại thông minh với chip A18, camera 48MP, hỗ trợ 5G.",
    images: [
      "/img/iphone-16-pro.jpg",
      "/img/iphone-16-pro.jpg"
    ],
    category: "Điện thoại & Phụ kiện",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {name: "White", value: "#FFFFFF"},
      {name: "Black", value: "#000000"},
      {name: "Gray", value: "#808080"}
    ],
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Tai nghe AirPods Pro 2",
    price: 79.99,
    description: "Tai nghe true wireless với tính năng khử tiếng ồn, âm thanh vòm.",
    images: [
      "/img/airpods-pro-2.jpg",
      "/img/airpods-pro-2.jpg",
    ],
    category: "Điện thoại & Phụ kiện",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      {name: "Blue", value: "#0000FF"},
      {name: "Black", value: "#000000"}
    ],
    isFeatured: true
  },
  {
    id: 3,
    name: "Pin dự phòng Anker PowerCore 10000",
    price: 149.99,
    salePrice: 119.99,
    description: "Dung lượng 10.000mAh, sạc nhanh, gọn nhẹ.",
    images: [
      "/img/anker-powercore.jpg",
      "/img/anker-powercore.jpg"
    ],
    category: "Điện thoại & Phụ kiện",
    sizes: ["S", "M", "L"],
    colors: [
      {name: "Camel", value: "#C19A6B"},
      {name: "Black", value: "#000000"}
    ],
    onSale: true
  },
  {
    id: 4,
    name: "MacBook Air M2",
    price: 59.99,
    description: "Laptop mỏng nhẹ, chip M2, màn hình Retina 13.6 inch.",
    images: [
      "/img/macbook-air-m2.jpg",
      "/img/macbook-air-m2.jpg"
    ],
    category: "Máy tính & Laptop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {name: "Gray", value: "#808080"},
      {name: "Navy", value: "#000080"},
      {name: "Black", value: "#000000"}
    ]
  },
  {
    id: 5,
    name: "Bàn phím cơ Logitech G Pro X",
    price: 89.99,
    salePrice: 69.99,
    description: "Phím cơ có thể thay switch, đèn RGB tùy chỉnh.",
    images: [
      "/img/logitech-g-pro-x.jpg",
      "/img/logitech-g-pro-x.jpg"
    ],
    category: "Máy tính & Laptop",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      {name: "Floral", value: "#FF7F50"}
    ],
    onSale: true
  },
  {
    id: 6,
    name: "SSD Samsung 970 EVO Plus 1TB",
    price: 119.99,
    description: "Ổ cứng SSD NVMe tốc độ cao, lý tưởng cho laptop/PC.",
    images: [
      "/img/ssd-samsung-970.jpg",
      "/img/ssd-samsung-970.jpg"
    ],
    category: "Máy tính & Laptop",
    sizes: ["One Size"],
    colors: [
      {name: "Tan", value: "#D2B48C"},
      {name: "Black", value: "#000000"}
    ],
    isFeatured: true
  },
  {
    id: 7,
    name: "Loa Bluetooth JBL Flip 6",
    price: 129.99,
    description: "Loa di động, chống nước, âm thanh mạnh mẽ.",
    images: [
      "/img/jbl-flip-6.jpg",
      "/img/jbl-flip-6.jpg"
    ],
    category: "Thiết bị âm thanh",
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      {name: "Black/White", value: "#000000"},
      {name: "Blue/Orange", value: "#0000FF"}
    ]
  },
  {
    id: 8,
    name: "Tai nghe Sony WH-1000XM5",
    price: 64.99,
    description: "Tai nghe over-ear, khử tiếng ồn hàng đầu.",
    images: [
      "/img/sony-wh.jpg",
      "/img/sony-wh.jpg"
    ],
    category: "Thiết bị âm thanh",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      {name: "Black", value: "#000000"},
      {name: "Navy", value: "#000080"}
    ],
    isNew: true
  },
  {
    id: 9,
    name: "Soundbar Bose Smart Soundbar 900",
    price: 69.99,
    description: "Hệ thống âm thanh gia đình, hỗ trợ Dolby Atmos.",
    images: [
      "/img/smart-soundbar-900.jpg",
      "/img/smart-soundbar-900.jpg"
    ],
    category: "Thiết bị âm thanh",
    sizes: ["6", "7", "8", "9", "10"],
    colors: [
      {name: "White", value: "#FFFFFF"}
    ],
    isFeatured: true
  },
  {
    id: 10,
    name: "Sony Alpha ZV-E10",
    price: 24.99,
    salePrice: 19.99,
    description: "Máy ảnh mirrorless, lý tưởng cho vlogger, quay video 4K.",
    images: [
      "/img/sony-alpha.jpg",
      "/img/sony-alpha.jpg"
    ],
    category: "Máy ảnh & Thiết bị quay phim",
    sizes: ["One Size"],
    colors: [
      {name: "Gray", value: "#808080"},
      {name: "Black", value: "#000000"},
      {name: "Burgundy", value: "#800020"}
    ],
    onSale: true
  },
  {
    id: 11,
    name: "DJI Mini 4 Pro",
    price: 49.99,
    description: "Drone nhỏ gọn, camera 4K, thời gian bay 34 phút.",
    images: [
      "/img/dji-mini-4-pro.jpg",
      "/img/dji-mini-4-pro.jpg"
    ],
    category: "Máy ảnh & Thiết bị quay phim",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {name: "White", value: "#FFFFFF"},
      {name: "Light Blue", value: "#ADD8E6"},
      {name: "Beige", value: "#F5F5DC"}
    ],
    isNew: true
  },
  {
    id: 12,
    name: "Chân máy Manfrotto Compact Action",
    price: 129.99,
    salePrice: 99.99,
    description: "Chân máy nhẹ, phù hợp cho máy ảnh và smartphone.",
    images: [
      "/img/manfrotto-compact-action.jpg",
      "/img/manfrotto-compact-action.jpg"
    ],
    category: "Máy ảnh & Thiết bị quay phim",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {name: "Black", value: "#000000"},
      {name: "Olive", value: "#808000"}
    ],
    onSale: true
  }
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = () => {
  return products.filter(product => product.isNew);
};

export const getSaleProducts = () => {
  return products.filter(product => product.onSale);
};

export const getFeaturedCategories = () => {
  return categories.filter(category => category.featured);
};
