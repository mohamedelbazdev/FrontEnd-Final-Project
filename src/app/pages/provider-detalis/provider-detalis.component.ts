import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductLayout } from 'src/app/shared/components/product/product.component';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { RootService } from 'src/app/shared/services/root.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-provider-detalis',
  templateUrl: './provider-detalis.component.html',
  styleUrls: ['./provider-detalis.component.scss']
})
export class ProviderDetalisComponent  {
    @Input() layout: ProductLayout = 'standard';

    @Input() product!: Product;

    quantity: FormControl = new FormControl(1);

    addingToBook = false;
    addingToWishlist = false;
    addingToCompare = false;


    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cart: CartService,
        private wishlist: WishlistService,
        private compare: CompareService,
        public root: RootService,
    ) { }

  addToBook(): void {
    if (!this.addingToBook && this.product && this.quantity.value > 0) {
        this.addingToBook = true;

        this.cart.add(this.product, this.quantity.value).subscribe({complete: () => this.addingToBook = false});
    }
}

addToWishlist(): void {
    if (!this.addingToWishlist && this.product) {
        this.addingToWishlist = true;

        this.wishlist.add(this.product).subscribe({complete: () => this.addingToWishlist = false});
    }
}

addToCompare(): void {
    if (!this.addingToCompare && this.product) {
        this.addingToCompare = true;

        this.compare.add(this.product).subscribe({complete: () => this.addingToCompare = false});
    }
}

}
