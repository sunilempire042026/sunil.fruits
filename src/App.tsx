import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { products, categories, Product } from './data/products';

// ==================== TYPES ====================
interface CartItem {
  product: Product;
  quantity: number;
}

type View = 'shop' | 'checkout' | 'confirmation';

// ==================== ICONS (SVG) ====================
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={filled ? 0 : 2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// ==================== TOAST ====================
function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-stone-800 text-amber-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium">
        <span className="text-emerald-400">✓</span>
        {message}
      </div>
    </div>
  );
}

// ==================== RATING STARS ====================
function RatingStars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= Math.round(rating)} />
        ))}
      </div>
      <span className="text-xs text-stone-500">({reviews})</span>
    </div>
  );
}

// ==================== PRODUCT CARD ====================
function ProductCard({ product, onAddToCart, onViewDetail }: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetail: (p: Product) => void;
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col">
      {/* Product Image Area */}
      <div
        className={`relative bg-gradient-to-br ${product.gradient} p-8 flex items-center justify-center cursor-pointer overflow-hidden`}
        onClick={() => onViewDetail(product)}
      >
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition-colors duration-300" />
        <span className="text-7xl md:text-8xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500 select-none">
          {product.emoji}
        </span>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm">
          {product.season}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-stone-800 text-lg leading-tight">{product.name}</h3>
        </div>
        <p className="text-xs text-stone-500 mb-2 flex items-center gap-1">
          <span>📍</span> {product.origin}
        </p>
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <p className="text-sm text-stone-600 mt-3 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-end justify-between mt-4 pt-4 border-t border-stone-100">
          <div>
            <span className="text-2xl font-bold text-stone-800">${product.price.toFixed(2)}</span>
            <span className="text-xs text-stone-500 ml-1">/ {product.unit}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCT DETAIL MODAL ====================
function ProductDetailModal({ product, onClose, onAddToCart }: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className={`bg-gradient-to-br ${product.gradient} p-10 md:p-16 flex items-center justify-center relative`}>
          <span className="text-8xl md:text-9xl drop-shadow-xl">{product.emoji}</span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-sm"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800">{product.name}</h2>
              <p className="text-sm text-stone-500 mt-1 flex items-center gap-1">
                <span>📍</span> {product.origin}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-stone-800">${product.price.toFixed(2)}</div>
              <div className="text-sm text-stone-500">per {product.unit}</div>
            </div>
          </div>

          <RatingStars rating={product.rating} reviews={product.reviews} />

          <p className="text-stone-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <h4 className="font-semibold text-stone-800 mb-3">What makes this special:</h4>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-amber-600 mt-0.5">✦</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-stone-500">
            <span>🗓️</span> Season: {product.season}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-stone-100">
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-stone-50 transition-colors"
              >
                <MinusIcon />
              </button>
              <span className="px-5 py-3 font-semibold text-stone-800 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-stone-50 transition-colors"
              >
                <PlusIcon />
              </button>
            </div>
            <button
              onClick={() => { onAddToCart(product, quantity); onClose(); }}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98]"
            >
              Add {quantity} to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CART SIDEBAR ====================
function CartSidebar({ cart, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 12.99;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <CartIcon /> Your Cart
            {cart.length > 0 && (
              <span className="bg-amber-100 text-amber-700 text-sm px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400">
              <span className="text-6xl mb-4">🧺</span>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add some exquisite fruits!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-stone-50 rounded-xl p-3">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.product.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-3xl">{item.product.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-800 text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-stone-500">{item.product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-stone-50 transition-colors"
                        >
                          <MinusIcon />
                        </button>
                        <span className="px-3 text-sm font-semibold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-stone-50 transition-colors"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <span className="font-semibold text-stone-800 text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-stone-400 hover:text-red-500 transition-colors self-start p-1"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-stone-100 p-5 space-y-3">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-amber-600">Add ${(150 - subtotal).toFixed(2)} more for free shipping!</p>
            )}
            <div className="flex justify-between text-lg font-bold text-stone-800 pt-2 border-t border-stone-100">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98] mt-2"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ==================== CHECKOUT ====================
function CheckoutPage({ cart, onBack, onComplete }: {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 12.99;
  const total = subtotal + shipping;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.zip.trim()) newErrors.zip = 'Required';
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Valid card number required';
    if (!formData.expiry.trim()) newErrors.expiry = 'Required';
    if (!formData.cvv.trim() || formData.cvv.length < 3) newErrors.cvv = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onComplete();
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all text-sm`;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-6 transition-colors">
          <BackIcon /> Back to Shop
        </button>

        <h1 className="text-3xl font-bold text-stone-800 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Shipping */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Shipping Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">First Name</label>
                    <input className={inputClass('firstName')} value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} placeholder="John" />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">Last Name</label>
                    <input className={inputClass('lastName')} value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} placeholder="Doe" />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-stone-600 mb-1 block">Email</label>
                    <input type="email" className={inputClass('email')} value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="john@example.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-stone-600 mb-1 block">Address</label>
                    <input className={inputClass('address')} value={formData.address} onChange={e => handleChange('address', e.target.value)} placeholder="123 Orchard Lane" />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">City</label>
                    <input className={inputClass('city')} value={formData.city} onChange={e => handleChange('city', e.target.value)} placeholder="Portland" />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">ZIP Code</label>
                    <input className={inputClass('zip')} value={formData.zip} onChange={e => handleChange('zip', e.target.value)} placeholder="97201" />
                    {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Payment Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">Card Number</label>
                    <input
                      className={inputClass('cardNumber')}
                      value={formData.cardNumber}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        handleChange('cardNumber', v.replace(/(\d{4})/g, '$1 ').trim());
                      }}
                      placeholder="4242 4242 4242 4242"
                    />
                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">Expiry</label>
                      <input
                        className={inputClass('expiry')}
                        value={formData.expiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                          handleChange('expiry', v);
                        }}
                        placeholder="MM/YY"
                      />
                      {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">CVV</label>
                      <input
                        className={inputClass('cvv')}
                        value={formData.cvv}
                        onChange={e => handleChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-8">
                <h3 className="font-bold text-stone-800 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.product.gradient} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-lg">{item.product.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-800 truncate">{item.product.name}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-stone-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-stone-800 pt-2 border-t border-stone-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98] mt-6"
                >
                  Place Order — ${total.toFixed(2)}
                </button>
                <p className="text-xs text-stone-400 text-center mt-3">🔒 This is a simulated checkout</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== ORDER CONFIRMATION ====================
function OrderConfirmation({ onBackToShop }: { onBackToShop: () => void }) {
  const orderNumber = useMemo(() => `OV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, []);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-sm border border-stone-100">
        <div className="mb-6">
          <CheckIcon />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Order Confirmed!</h2>
        <p className="text-stone-600 mb-6">Thank you for your purchase. Your exquisite fruits are being prepared with care.</p>
        <div className="bg-amber-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-stone-600">Order Number</p>
          <p className="text-xl font-bold text-amber-700">{orderNumber}</p>
        </div>
        <div className="space-y-3 text-sm text-stone-600 text-left mb-8">
          <div className="flex items-center gap-2">
            <span>📧</span> Confirmation email sent
          </div>
          <div className="flex items-center gap-2">
            <span>📦</span> Estimated delivery: 2-4 business days
          </div>
          <div className="flex items-center gap-2">
            <span>🌡️</span> Temperature-controlled shipping
          </div>
        </div>
        <button
          onClick={onBackToShop}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98]"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [view, setView] = useState<View>('shop');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const updateQuantity = useCallback((productId: number, newQty: number) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev => prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      ));
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setView('checkout');
  };

  const handleOrderComplete = () => {
    setCart([]);
    setView('confirmation');
  };

  const handleBackToShop = () => {
    setView('shop');
  };

  useEffect(() => {
    if (mobileSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [mobileSearchOpen]);

  // Render checkout or confirmation views
  if (view === 'checkout') {
    return <CheckoutPage cart={cart} onBack={handleBackToShop} onComplete={handleOrderComplete} />;
  }

  if (view === 'confirmation') {
    return <OrderConfirmation onBackToShop={handleBackToShop} />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍑</span>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-stone-800 leading-tight">Orchard & Vine</h1>
                <p className="text-[10px] md:text-xs text-stone-500 tracking-wider uppercase hidden sm:block">Specialty Fruit Boutique</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fruits, origins..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 text-sm transition-all bg-stone-50 focus:bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 hover:bg-stone-100 rounded-xl transition-colors"
              >
                <SearchIcon />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 hover:bg-stone-100 rounded-xl transition-colors"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileSearchOpen ? 'max-h-16 pb-3' : 'max-h-0'}`}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                <SearchIcon />
              </div>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fruits, origins..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 text-sm bg-stone-50"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-800 leading-tight">
              The World's Finest
              <span className="text-amber-600"> Fruits</span>
            </h2>
            <p className="mt-4 text-stone-600 text-base md:text-lg leading-relaxed">
              Discover rare, hand-selected varieties from the world's most renowned orchards.
              Each fruit tells a story of heritage, craftsmanship, and exceptional flavor.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-stone-600">
              <span className="flex items-center gap-1.5">🌍 Sourced globally</span>
              <span className="flex items-center gap-1.5">🌡️ Cold-chain delivery</span>
              <span className="flex items-center gap-1.5">✨ Hand-selected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">🔍</span>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">No fruits found</h3>
            <p className="text-stone-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-stone-500 mb-4">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'fruit' : 'fruits'}
              {searchQuery && <span> for "<span className="text-stone-700 font-medium">{searchQuery}</span>"</span>}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetail={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🍑</span>
                <span className="text-lg font-bold text-white">Orchard & Vine</span>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                Curating the world's most exceptional fruits since 2020. Every selection is a celebration of nature's finest.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">About Us</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Shipping Policy</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Gift Cards</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quality Promise</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">✅ 100% freshness guarantee</li>
                <li className="flex items-center gap-2">🌡️ Temperature-controlled shipping</li>
                <li className="flex items-center gap-2">🔄 Satisfaction or replacement</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-6 text-center text-xs text-stone-500">
            © 2026 Orchard & Vine. All rights reserved. This is a demo store.
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
