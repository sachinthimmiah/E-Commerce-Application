import React from 'react';
import { CartIcon } from './CartIcon';
import { ProfileDropdown } from './ProfileDropdown';
 import './assets/home.css';
 

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-content">
      <h2 href="/customerhome">ShopNest</h2>
        <div className="header-actions">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}
