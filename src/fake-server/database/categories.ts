import { CategoryDef } from '../interfaces/category-def';
import { Category } from '../../app/shared/interfaces/category';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

let lastCategoryId = 0;

const shopCategoriesDef: CategoryDef[] = [
    {
        name: 'Instruments',
        slug: 'instruments',
        items: 272,
        children: [
            {
                name: 'Electricity',
                slug: 'electricity',
                image: 'assets/images/categories/category-1.png',
                items: 370,

            },
            {
                name: 'Carpenters',
                slug: 'Carpenters',
                image: 'assets/images/categories/category-2.png',
                items: 134,
            },
            {
                name: 'Gardener',
                slug: 'gardener',
                image: 'assets/images/categories/category-3.png',
                items: 302,
            },
            {
                name: 'Plumbers',
                slug: 'plumbers',
                image: 'assets/images/categories/category-4.png',
                items: 79,
            },
            {
                name: 'Cleanliness',
                slug: 'Cleanliness',
                image: 'assets/images/categories/category-5.png',
                items: 366,
            },
            {
                name: 'Maintenance',
                slug: 'Maintenance',
                image: 'assets/images/categories/category-6.png',
                items: 82,
            },
        ],
    },
    {
        name: 'Electronics',
        slug: 'electronics',
        items: 54,
    },
    {
        name: 'Computers',
        slug: 'computers',
        items: 421,
    },
    {
        name: 'Automotive',
        slug: 'automotive',
        items: 182,
    },
    {
        name: 'Furniture & Appliances',
        slug: 'furniture-appliances',
        items: 15,
    },
    {
        name: 'Music & Books',
        slug: 'music-books',
        items: 89,
    },
    {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        items: 201,
    },
];
const blogCategoriesDef: CategoryDef[] = [
    {
        name: 'Latest News',
        slug: 'latest-news',
    },
    {
        name: 'Special Offers',
        slug: 'special-offers',
    },
    {
        name: 'New Arrivals',
        slug: 'new-arrivals',
    },
    {
        name: 'Reviews',
        slug: 'reviews',
    },
    {
        name: 'Drills and Mixers',
        slug: 'drills-and-mixers',
    },
    {
        name: 'Cordless Screwdrivers',
        slug: 'cordless-screwdrivers',
    },
    {
        name: 'Screwdrivers',
        slug: 'screwdrivers',
    },
    {
        name: 'Wrenches',
        slug: 'wrenches',
    },
];

function walkTree(categoriesType: 'shop'|'blog', categoriesDef: CategoryDef[], parents: Category[] = []): [Category[], Category[]] {
    let list: Category[] = [];
    const tree: Category[] = categoriesDef.map(categoryDef => {
        const category: Category = {
            id: ++lastCategoryId,
            type: categoriesType,
            name: categoryDef.name,
            slug: categoryDef.slug,
            path: [...parents.map(x => x.slug), categoryDef.slug].join('/'),
            image: categoryDef.image || null,
            items: categoryDef.items || 0,
            customFields: {},
            parents: parents.slice(),
        };

        const [childrenTree, childrenList] = walkTree(categoriesType, categoryDef.children || [], [...parents, category]);

        category.children = childrenTree;
        list = [...list, category, ...childrenList];

        return category;
    });

    return [tree, list];
}

export const [shopCategoriesTree, shopCategoriesList]: [Category[], Category[]] = walkTree('shop', shopCategoriesDef);
export const [blogCategoriesTree, blogCategoriesList]: [Category[], Category[]] = walkTree('blog', blogCategoriesDef);

function limitDepth(categories: Category[], depth: number): Category[] {
    return categories.map(category => {
        return {
            ...category,
            parents: null,
            children: depth !== 0 ? limitDepth(category.children || [], depth - 1) : null,
        };
    });
}

function getCategoriesTree(categoriesType: 'shop'|'blog', parentSlug: string|null = null, depth: number = 0): Observable<Category[]> {
    let categories = [];
    const list = categoriesType === 'shop' ? shopCategoriesList : blogCategoriesList;
    const tree = categoriesType === 'shop' ? shopCategoriesTree : blogCategoriesTree;

    if (parentSlug === null) {
        categories = tree.slice();
    } else {
        const parent = list.find(x => x.slug === parentSlug);

        if (!parent) {
            return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
        }

        categories = (parent.children || []).slice();
    }

    return of(limitDepth(categories, depth));
}

export function getShopCategoriesTree(parentSlug: string|null = null, depth: number = 0): Observable<Category[]> {
    return getCategoriesTree('shop', parentSlug, depth);
}

export function getBlogCategoriesTree(parentSlug: string|null = null, depth: number = 0): Observable<Category[]> {
    return getCategoriesTree('blog', parentSlug, depth);
}

export function getShopCategoriesBySlugs(slugs: string[], depth: number = 0): Observable<Category[]> {
    return of(limitDepth(shopCategoriesList.filter(x => slugs.includes(x.slug)), depth));
}

export function getShopCategory(slug: string): Observable<Category> {
    const category = shopCategoriesList.find(x => x.slug === slug);

    if (!category) {
        return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
    }

    return of(JSON.parse(JSON.stringify({
        ...category,
        parents: limitDepth(category.parents || [], 0),
        children: limitDepth(category.children || [], 0),
    })));
}
