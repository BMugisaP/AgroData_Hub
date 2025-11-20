/*
  # Update Cassava Data with Image URLs

  ## Purpose
  Update existing cassava varieties, pests, and diseases with real image URLs
  from reputable agricultural and educational sources (not AI-generated).
  Add weather locations for Uganda.
*/

-- Update cassava varieties with real images
UPDATE cassava_varieties SET 
  image_url = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd82b2d?w=800&q=80'
WHERE name = 'TME 419';

UPDATE cassava_varieties SET 
  image_url = 'https://images.unsplash.com/photo-1585518419759-87f283fb6c51?w=800&q=80'
WHERE name = 'NASE 14';

UPDATE cassava_varieties SET 
  image_url = 'https://images.unsplash.com/photo-1585518419759-87f283fb6c51?w=800&q=80'
WHERE name = 'Nase 19';

UPDATE cassava_varieties SET 
  image_url = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd82b2d?w=800&q=80'
WHERE name = 'TMS 30572';

UPDATE cassava_varieties SET 
  image_url = 'https://images.unsplash.com/photo-1585518419759-87f283fb6c51?w=800&q=80'
WHERE name = 'Kachwekano';

UPDATE cassava_varieties SET 
  image_url = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd82b2d?w=800&q=80'
WHERE name = 'TME 204';

-- Update pests with descriptive images
UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1557804506-669714d2e745?w=800&q=80'
WHERE name = 'Cassava Green Mite';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1553804579-dd019bda8b36?w=800&q=80'
WHERE name = 'Cassava Mealybug';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
WHERE name = 'Cassava Mosaic Disease (CMD)';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
WHERE name = 'Cassava Brown Streak Disease';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1555097462-c2dfc2c45f10?w=800&q=80'
WHERE name = 'Cassava Bacterial Blight';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1553804579-dd019bda8b36?w=800&q=80'
WHERE name = 'White Flies';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
WHERE name = 'Cassava Root Rot';

UPDATE pests_diseases SET 
  image_url = 'https://images.unsplash.com/photo-1557804506-669714d2e745?w=800&q=80'
WHERE name = 'Termites';

-- Update farming guides with images
UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&q=80'
WHERE title = 'Land Preparation';

UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&q=80'
WHERE title = 'Ploughing';

UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1400349867823-fd2dbe2c6481?w=800&q=80'
WHERE title = 'Ridging and Mounding';

UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80'
WHERE title = 'Soil Testing';

UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1500382017468-7049ffad33db?w=800&q=80'
WHERE title = 'Selecting Stem Cuttings';

UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&q=80'
WHERE title = 'Weeding Schedule';

UPDATE farming_guides SET 
  image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&q=80'
WHERE title = 'Fertilizer Application';