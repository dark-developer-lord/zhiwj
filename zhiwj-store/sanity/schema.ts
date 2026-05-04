export const schema = {
  types: [
    {
      name: 'product',
      type: 'document',
      title: 'Товар',
      fields: [
        { 
          name: 'name', 
          type: 'string', 
          title: 'Название',
          validation: (Rule: any) => Rule.required()
        },
        { 
          name: 'slug', 
          type: 'slug', 
          options: { source: 'name' }, 
          title: 'URL (slug)',
          validation: (Rule: any) => Rule.required()
        },
        { 
          name: 'price', 
          type: 'number', 
          title: 'Цена (TJS)',
          validation: (Rule: any) => Rule.required().positive()
        },
        { 
          name: 'images', 
          type: 'array', 
          of: [{ type: 'image', options: { hotspot: true } }], 
          title: 'Фото товара',
          options: { layout: 'grid' }
        },
        { 
          name: 'description', 
          type: 'text', 
          title: 'Описание',
          rows: 3
        },
        { 
          name: 'sizes', 
          type: 'array', 
          of: [{ type: 'string' }], 
          title: 'Размеры (S, M, L, XL)',
          options: { layout: 'tags' }
        },
        { 
          name: 'collection', 
          type: 'string', 
          options: { 
            list: [
              { title: 'Tamaddoon', value: 'Tamaddoon' },
              { title: 'Metomorfoz', value: 'Metomorfoz' },
              { title: 'Bahor', value: 'Bahor' },
              { title: 'Dynamic', value: 'Dynamic' }
            ] 
          }, 
          title: 'Коллекция'
        },
        { 
          name: 'inStock', 
          type: 'boolean', 
          title: 'В наличии', 
          initialValue: true 
        },
        { 
          name: 'history', 
          type: 'text', 
          title: 'История изделия / Трофеи',
          description: 'Расскажите историю создания этого изделия',
          rows: 4
        },
      ],
    },
    {
      name: 'order',
      type: 'document',
      title: 'Заказ',
      fields: [
        { 
          name: 'customerEmail', 
          type: 'string', 
          title: 'Email клиента',
          validation: (Rule: any) => Rule.email()
        },
        { 
          name: 'customerName', 
          type: 'string', 
          title: 'Имя клиента'
        },
        { 
          name: 'customerPhone', 
          type: 'string', 
          title: 'Телефон'
        },
        { 
          name: 'status', 
          type: 'string', 
          options: { 
            list: [
              { title: 'Ожидает оплаты', value: 'pending' },
              { title: 'Оплачен', value: 'paid' },
              { title: 'Отправлен', value: 'shipped' },
              { title: 'Доставлен', value: 'delivered' },
              { title: 'Отменен', value: 'cancelled' }
            ] 
          }, 
          title: 'Статус',
          initialValue: 'pending'
        },
        { 
          name: 'total', 
          type: 'number', 
          title: 'Сумма заказа (TJS)'
        },
        { 
          name: 'stripeSessionId', 
          type: 'string', 
          title: 'Stripe Session ID'
        },
        { 
          name: 'items', 
          type: 'array', 
          of: [
            { 
              type: 'object',
              fields: [
                { name: 'productName', type: 'string', title: 'Название товара' },
                { name: 'productId', type: 'string', title: 'ID товара' },
                { name: 'size', type: 'string', title: 'Размер' },
                { name: 'quantity', type: 'number', title: 'Количество' },
                { name: 'price', type: 'number', title: 'Цена за шт' }
              ]
            }
          ], 
          title: 'Товары в заказе'
        },
        {
          name: 'shippingAddress',
          type: 'text',
          title: 'Адрес доставки',
          rows: 3
        }
      ],
      orderings: [
        {
          title: 'Дата (новые сверху)',
          name: 'createdAtDesc',
          by: [{ field: '_createdAt', direction: 'desc' }]
        }
      ]
    }
  ]
};

export const schemaTypes = schema.types;
