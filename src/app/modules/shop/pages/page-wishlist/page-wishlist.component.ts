import { Component , OnInit } from '@angular/core';
import { WishlistService } from '../../../../shared/api/wishlist.service';
// import { WishlistService } from '../../../../shared/services/wishlist.service';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../../../shared/services/cart.service';
import { RootService } from '../../../../shared/services/root.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './page-wishlist.component.html',
    styleUrls: ['./page-wishlist.component.scss']
})

export class PageWishlistComponent implements OnInit  {
    featuredfavorites!: any[];

    constructor(
        public root: RootService,
        public fav: WishlistService,
        public cart: CartService

    ) { }

    ngOnInit(): void {
    this.fav.getfavorites().subscribe(res => {
        this.featuredfavorites = res.data
        console.log(res.data)
    })
}

    addedToCartProducts: Product[] = [];
    removedProducts: Product[] = [];

    addToBook(product: Product): void {
        if (this.addedToCartProducts.includes(product)) {
            return;
        }

        this.addedToCartProducts.push(product);
        this.cart.add(product, 1).subscribe({
            complete: () => {
                this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }

    // remove(product: Product): void {

        // if (this.removedProducts.includes(product)) {
        //     return;
        //  }

        //  this.removedProducts.push(product);
        // this.fav.remove(product).subscribe({
        //     complete: () => {
        //         this.removedProducts = this.removedProducts.filter(eachProduct => eachProduct !== product);
        //     }
        // });


    // }

    removed(id: any){
        this.fav.removefav(id).subscribe( res=>{
            let index = this.featuredfavorites.findIndex(cat => cat.id === id)
            this.featuredfavorites.splice(index,1)

        })




    }
}
