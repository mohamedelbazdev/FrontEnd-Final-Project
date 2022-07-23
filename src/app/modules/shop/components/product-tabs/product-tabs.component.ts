import { Component, Input } from '@angular/core';

import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';

    reviews: Review[] = reviews;

    constructor() { }
}
