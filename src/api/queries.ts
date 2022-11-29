export const GET_NAV_DATA =
    `query getCategories{
    categories {
        name
    }
    currencies{
        label
        symbol
        }
    }`

export const GET_SINGLE_CAT = (name: string | undefined): string => {
    const input = name ? `(input:{title:"${name}"})` : ""
    return (
        `query getCategory {
            category${input} { 
                name
                products {
                    id
                    name
                    inStock
                    gallery
                    brand
                    attributes {
                        id
                        name
                        type
                        items {
                            id
                            value
                            displayValue
                        }
                    }
                    prices{
                        amount
                        currency {
                            label
                            symbol
                        }
                    }
                }
            }
        }`
    )
}

export const GET_PROD = (id: string): string => {
    return (
        `query getProduct {
            product(id: "${id}") {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                    id
                    name
                    type
                    items {
                        id
                        value
                        displayValue
                    }
                }
                prices{
                    amount
                    currency{
                        label
                        symbol
                    }
                }
                brand
            }
        }`
    )
}