import { create } from 'zustand';
import axios from 'axios';

// Load cart from localStorage on initial load
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

const useStore = create((set) => ({
  cart: savedCart,
  categories: [],
  products: [],
  singleProduct: null,
  relatedProducts:null,
  subtotal: 0,
  metaa:null,
  // Fetch All Categories
  getAllCategories: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/service-categories`);
      set({ categories: response.data.serviceCategories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  getAllProducts: async (page = 1, limit = 9, category = '', search = '', sort = '') => {
    try {
      let url = `http://localhost:3000/api/standard/items?page=${page}&limit=${limit}`;
  
      if (category) {
        url += `&category=${category}`;
      }
  
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (sort && sort !== 'default') {
        url += `&sort=${sort}`;
      }
  
      const response = await axios.get(url);
      console.log(response.data.meta)
      set({ products: response.data.items, metaa: response.data.meta });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  },

  // Fetch Single Product
  getProductById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/standard/items/${id}`);
      set({ singleProduct: response.data });
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  },
  // Fetch Related Products by Category
  getRelatedProductsByCategory: async (currentProductCategories, currentProductId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/standard/items`);
      const allProducts = response.data.items || [];
      console.log(allProducts)
      const related = allProducts.filter((item) => {
        if (item._id === currentProductId || !item.category) return false;
  
        const itemCategoryIds = item.category.map((cat) => cat._id);
        const currentCategoryIds = currentProductCategories.map((cat) => cat._id);
  
        // Check if any category overlaps
        return itemCategoryIds.some((id) => currentCategoryIds.includes(id));
      }).slice(0, 4); // Limit to 4
  
      set({ relatedProducts: related });
    } catch (error) {
      console.error("Failed to fetch related products:", error);
    }
  },
  

  // Add to Cart (with Quantity Increment Logic)
  addToCart: (product, options, quantity) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => (item._id || item.id) === (product._id || product.id) && item.options.position === options.position
      );

      let updatedCart;
      if (existingProduct) {
        updatedCart = state.cart.map((item) =>
          (item._id || item.id) === (product._id || product.id) && item.options.position === options.position
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, options, quantity }];
      }

      // Google Analytics add_to_cart event
      if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
          items: [
            {
              id: product._id || product.id,
              name: product.title || product.itemName,
              price: product.price,
              quantity: quantity,
            },
          ],
          value: product.price * quantity,
          currency: 'GBP',
        });
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  // ✅ Update Quantity in Cart
  updateCartQuantity: (productId, position, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        (item._id || item.id) === productId && item.options.position === position
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Remove from Cart
  removeFromCart: (productId, position) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) => !((item._id || item.id) === productId && item.options.position === position)
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Calculate Subtotal
  calculateSubtotal: () =>
    set((state) => {
      const subtotal = state.cart.reduce((sum, item) => {
        const basePrice = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('£', '')) 
          : item.price;

        const optionPrice = item.options.position.includes('+')
          ? parseFloat(item.options.position.match(/\+£(\d+\.\d+)/)?.[1] || 0)
          : 0;

        return sum + (basePrice + optionPrice) * item.quantity;
      }, 0);

      return { subtotal };
    }),

  // Clear Cart
  clearCart: () => {
    localStorage.removeItem('cart');
    return { cart: [], subtotal: 0 };
  },

  blogs: [],
  tags: [],
  singleBlog: null,
  relatedBlogs: [],
  meta: {},
  searchQuery: '',
  // Fetch All Blogs
  getAllBlogs: async (page = 1, limit = 9, tag = '', search = '') => {
    try {
      let url = `http://localhost:3000/api/blog?page=${page}&limit=${limit}`;
  
      // Fix: Send filters as a JSON object and encode it properly
      if (tag) {
        const filters = JSON.stringify({ tags: tag }); 
        url += `&filters=${encodeURIComponent(filters)}`;
      }
  
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
  
      const response = await axios.get(url);
  
      set({
        blogs: response.data.blogs,
        meta: response.data.meta,
      });
  
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  },

  // Fetch All Tags
  getAllTags: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/blog/tags/getAllTags');
      set({ tags: response.data.tags });
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  },
 // Fetch Blog Details by ID
 getBlogById: async (id) => {
  const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
  set({ singleBlog: response.data });
},

// Fetch Related Blogs by Tag
getRelatedBlogs: async (tag) => {
  const response = await axios.get(`http://localhost:3000/api/blog/tag/${tag}`);
  set({ relatedBlogs: response.data });
},
  // Set Search Query
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useStore;
