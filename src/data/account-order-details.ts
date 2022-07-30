import { Order } from '../app/shared/interfaces/order';

export const order: Order = {
    id: 3857,
    date: '19 October, 2020',
    status: 'On hold',
    items: [
        {
            id: 1,
            slug: 'electric-planer',
            name: 'Electric Planer ',
            image: 'assets/images/products/product-1.PNG',

            price: 699,
            quantity: 2,
            total: 1398,
        },
        {
            id: 2,
            slug: 'Laborer',
            name: 'Laborer',
            image: 'assets/images/products/product-2.PNG',
            price: 849,
            quantity: 1,
            total: 849,
        },
        {
            id: 5,
            slug: 'router-power-tool-',
            name: 'Router Power Tool',
            image: 'assets/images/products/product-5.PNG',
            options: [
                {
                    label: 'Color',
                    value: 'True Red',
                },
            ],
            price: 1210,
            quantity: 3,
            total: 3630,
        },
    ],
    additionalLines: [
        {
            label: 'Store Credit',
            total: -20,
        },
        {
            label: 'Shipping',
            total: 25,
        },
    ],
    quantity: 6,
    subtotal: 5877,
    total: 5882,
    paymentMethod: 'PayPal',
    shippingAddress: {
        firstName: 'Mohmmed',
        lastName: 'Ahmed',
        email: ' GroupOne@iti.com',
        phone: '01100000000',
        country: 'Cairo',
        city: 'EL Shourk',
        address: 'st , El Tahrir'
    },
    billingAddress: {
        firstName: 'Omar',
        lastName: 'Ibrahim',
        email: 'GroupOne@iti.com',
        phone: '0100 012 015 011',
        country: 'Sohag',
        city: 'Juhayna',
        address: 'St, El Araby'
    },
};
