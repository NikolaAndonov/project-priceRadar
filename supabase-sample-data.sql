-- Insert sample categories
INSERT INTO categories (id, name, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Electronics', 'https://example.com/electronics.jpg'),
('22222222-2222-2222-2222-222222222222', 'Home & Kitchen', 'https://example.com/home.jpg'),
('33333333-3333-3333-3333-333333333333', 'Clothing', 'https://example.com/clothing.jpg'),
('44444444-4444-4444-4444-444444444444', 'Books', 'https://example.com/books.jpg');

-- Insert subcategories
INSERT INTO categories (id, name, parent_id, image_url) VALUES
('55555555-5555-5555-5555-555555555555', 'Smartphones', '11111111-1111-1111-1111-111111111111', 'https://example.com/smartphones.jpg'),
('66666666-6666-6666-6666-666666666666', 'Laptops', '11111111-1111-1111-1111-111111111111', 'https://example.com/laptops.jpg'),
('77777777-7777-7777-7777-777777777777', 'Kitchen Appliances', '22222222-2222-2222-2222-222222222222', 'https://example.com/appliances.jpg'),
('88888888-8888-8888-8888-888888888888', 'Men''s Clothing', '33333333-3333-3333-3333-333333333333', 'https://example.com/mens.jpg'),
('99999999-9999-9999-9999-999999999999', 'Women''s Clothing', '33333333-3333-3333-3333-333333333333', 'https://example.com/womens.jpg');

-- Insert sample stores
INSERT INTO stores (id, name, logo_url) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'TechWorld', 'https://example.com/techworld.jpg'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'HomeDepot', 'https://example.com/homedepot.jpg'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'FashionStore', 'https://example.com/fashionstore.jpg'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'BookHaven', 'https://example.com/bookhaven.jpg'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MegaMart', 'https://example.com/megamart.jpg');

-- Insert sample products
INSERT INTO products (id, name, brand, description, image_url, category_id, unit) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'iPhone 14 Pro', 'Apple', 'Latest iPhone with advanced features', 'https://example.com/iphone14.jpg', '55555555-5555-5555-5555-555555555555', 'piece'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'MacBook Pro 16', 'Apple', 'Powerful laptop for professionals', 'https://example.com/macbook.jpg', '66666666-6666-6666-6666-666666666666', 'piece'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Coffee Maker', 'Breville', 'Automatic coffee maker with grinder', 'https://example.com/coffeemaker.jpg', '77777777-7777-7777-7777-777777777777', 'piece'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Men''s Leather Jacket', 'Calvin Klein', 'Premium leather jacket for men', 'https://example.com/jacket.jpg', '88888888-8888-8888-8888-888888888888', 'piece'),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Women''s Summer Dress', 'Zara', 'Lightweight summer dress', 'https://example.com/dress.jpg', '99999999-9999-9999-9999-999999999999', 'piece'),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'The Great Gatsby', 'Penguin Books', 'Classic novel by F. Scott Fitzgerald', 'https://example.com/gatsby.jpg', '44444444-4444-4444-4444-444444444444', 'piece');

-- Insert sample prices
INSERT INTO prices (product_id, store_id, current_price, original_price, discount_percentage) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 999.99, 1099.99, 9.09),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 1049.99, 1099.99, 4.55),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1999.99, 2199.99, 9.09),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 2099.99, 2199.99, 4.55),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 129.99, 149.99, 13.33),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 139.99, 149.99, 6.67),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 89.99, 119.99, 25.00),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 49.99, 59.99, 16.67),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 12.99, 14.99, 13.34),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 13.99, 14.99, 6.67);

-- Insert sample price history (last 30 days)
INSERT INTO price_history (product_id, store_id, price, date) VALUES
-- iPhone price history at TechWorld
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1099.99, NOW() - INTERVAL '30 days'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1099.99, NOW() - INTERVAL '25 days'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1049.99, NOW() - INTERVAL '20 days'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1049.99, NOW() - INTERVAL '15 days'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 999.99, NOW() - INTERVAL '10 days'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 999.99, NOW() - INTERVAL '5 days'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 999.99, NOW()),

-- MacBook price history at TechWorld
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2199.99, NOW() - INTERVAL '30 days'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2199.99, NOW() - INTERVAL '25 days'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2099.99, NOW() - INTERVAL '20 days'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2099.99, NOW() - INTERVAL '15 days'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1999.99, NOW() - INTERVAL '10 days'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1999.99, NOW() - INTERVAL '5 days'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1999.99, NOW()),

-- Coffee Maker price history at HomeDepot
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 149.99, NOW() - INTERVAL '30 days'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 149.99, NOW() - INTERVAL '25 days'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 139.99, NOW() - INTERVAL '20 days'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 139.99, NOW() - INTERVAL '15 days'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 129.99, NOW() - INTERVAL '10 days'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 129.99, NOW() - INTERVAL '5 days'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 129.99, NOW()); 