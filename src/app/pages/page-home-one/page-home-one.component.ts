import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../../../data/blog-posts';
import { Brand } from '../../shared/interfaces/brand';
import { Observable, Subject, merge } from 'rxjs';
import { ShopService } from '../../shared/api/shop.service';
import { Product } from '../../shared/interfaces/product';
// import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import { takeUntil, tap } from 'rxjs/operators';
import {HomeService} from "../../shared/api/home.service";

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<Product[]>;
}

interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: Product[];
    groups: ProductsCarouselGroup[];
}

@Component({
    selector: 'app-home',
    templateUrl: './page-home-one.component.html',
    styleUrls: ['./page-home-one.component.scss']
})

export class PageHomeOneComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
    bestsellers$!: Observable<Product[]>;
    brands$!: Observable<Brand[]>;
    popularCategories!: any[];
    // popularCategories$!: Observable<Category[]>;

    columnTopRated$!: Observable<Product[]>;
    columnSpecialOffers$!: Observable<Product[]>;
    columnBestsellers$!: Observable<Product[]>;

    posts = posts;

    // featuredProvider!: ProductsCarouselData;
    featuredProvider!: any[];
    latestProducts!: ProductsCarouselData;

    constructor(
        private shop: ShopService,
        private home: HomeService
    ) { }

    ngOnInit(): void {
        this.bestsellers$ = this.shop.getBestsellers(7);
        this.brands$ = this.shop.getPopularBrands();
        this.home.getCategories().subscribe(res => {
            this.popularCategories = res.data
            console.log(res.data)
        })

        this.home.getProviders().subscribe(res => {
            this.featuredProvider = res.data
            console.log(res.data)
        })

        // this.popularCategories$ = this.shop.getCategoriesBySlug([
        //     'electricity',
        //     'Carpenters',
        //     'gardener',
        //     'plumbers',
        //     'Cleanliness',
        //     'Maintenance',
        // ], 1);
        this.columnTopRated$ = this.shop.getTopRated(3);
        this.columnSpecialOffers$ = this.shop.getSpecialOffers(3);
        this.columnBestsellers$ = this.shop.getBestsellers(3);

        // this.featuredProvider = {
        //     abort$: new Subject<void>(),
        //     loading: false,
        //     products: [],
        //     groups: [
        //         {
        //             name: 'All',
        //             current: true,
        //             products$: this.shop.getfeaturedProvider(null, 8),
        //         },
        //         {
        //             name: 'Electricity',
        //             current: false,
        //             products$: this.shop.getfeaturedProvider('electricity', 8),
        //         },
        //         {
        //             name: 'Carpenters',
        //             current: false,
        //             products$: this.shop.getfeaturedProvider('Carpenters', 8),
        //         },
        //         {
        //             name: 'Plumbing',
        //             current: false,
        //             products$: this.shop.getfeaturedProvider('plumbing', 8),
        //         },
        //     ],
        // };
        // this.groupChange(this.featuredProvider, this.featuredProvider.groups[0]);

        this.latestProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'All',
                    current: true,
                    products$: this.shop.getLatestProducts(null, 8),
                },
                {
                    name: 'Electricity',
                    current: false,
                    products$: this.shop.getLatestProducts('electricity', 8),
                },
                {
                    name: 'Carpenters',
                    current: false,
                    products$: this.shop.getLatestProducts('Carpenters', 8),
                },
                {
                    name: 'Plumbing',
                    current: false,
                    products$: this.shop.getLatestProducts('plumbing', 8),
                },
            ],
        };
        this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.products = x);
    }
}
