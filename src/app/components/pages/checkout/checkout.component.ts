import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart!: Cart;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}

  createOrder() {
    const orderData = {
      items: this.cart.items,
      totalPrice: this.cart.totalPrice,
      createdAt: new Date().toISOString(),
      // Include any other details like user info or address if needed
    };

    this.orderService.createOrder(orderData).subscribe(
      (response) => {
        console.log('Order created successfully:', response);
        this.router.navigate(['/order-confirmation']); // Redirect after order creation
      },
      (error) => {
        console.error('Error creating order:', error);
        alert('There was a problem creating your order. Please try again.');
      }
    );
  }
}
