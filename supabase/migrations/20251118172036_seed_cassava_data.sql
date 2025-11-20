/*
  # Seed Data for Cassava Agricultural System

  ## Purpose
  Populate the database with initial reference data including cassava varieties,
  farming guides, pests & diseases, fertilizers, and processing methods.

  ## Data Inserted
  - 6 cassava varieties
  - 20+ farming guide entries across all categories
  - 8 common pests and diseases
  - 5 fertilizer types
  - 5 processing methods
  - Sample market prices
*/

-- Insert Cassava Varieties
INSERT INTO cassava_varieties (name, type, description, yield_rate, maturity_period, suitable_soil, is_disease_resistant, is_drought_tolerant) VALUES
('TME 419', 'Sweet', 'High-yielding variety with excellent disease resistance. Popular among commercial farmers.', '25-30 tons/acre', '12 months', 'Well-drained loamy soil', true, false),
('NASE 14', 'Bitter', 'Drought-tolerant variety ideal for semi-arid regions. High starch content.', '20-25 tons/acre', '10-12 months', 'Sandy loam to clay', false, true),
('Nase 19', 'Sweet', 'Early maturing variety with good resistance to cassava mosaic disease.', '18-22 tons/acre', '8-10 months', 'Loamy soil', true, false),
('TMS 30572', 'Sweet', 'Disease-resistant variety suitable for fresh consumption and processing.', '22-28 tons/acre', '12-14 months', 'Well-drained fertile soil', true, false),
('Kachwekano', 'Bitter', 'Traditional variety with high starch content. Used for flour production.', '15-20 tons/acre', '14-16 months', 'Clay to loamy soil', false, false),
('TME 204', 'Sweet', 'High-yielding early maturing variety. Resistant to cassava brown streak disease.', '20-26 tons/acre', '9-11 months', 'Fertile loamy soil', true, true);

-- Insert Farming Guides - Land Preparation
INSERT INTO farming_guides (category, title, content, order_index) VALUES
('land_preparation', 'Field Clearing', 'Clear the field of all vegetation, stumps, and debris. Remove weeds and grasses completely. Burn or compost plant materials away from the planting area.', 1),
('land_preparation', 'Ploughing', 'Plough the field to a depth of 20-30cm to loosen the soil and improve aeration. This should be done during dry weather to allow proper soil breakdown.', 2),
('land_preparation', 'Ridging and Mounding', 'Create ridges or mounds 1 meter apart for proper drainage and root development. Ridges should be 20-30cm high and run across the slope to prevent erosion.', 3),
('land_preparation', 'Soil Testing', 'Test soil pH (ideal: 5.5-6.5) and nutrient levels. Add lime if soil is too acidic. Incorporate organic matter to improve soil structure.', 4),
('land_preparation', 'Spacing Layout', 'Mark planting positions at 1m × 1m spacing for optimal yield. Closer spacing (0.8m × 0.8m) can be used for early maturing varieties.', 5);

-- Insert Farming Guides - Planting
INSERT INTO farming_guides (category, title, content, order_index) VALUES
('planting', 'Best Planting Season', 'Plant cassava at the onset of rains (March-April or September-October). Ensure soil has adequate moisture but avoid waterlogged conditions.', 1),
('planting', 'Selecting Stem Cuttings', 'Use healthy stems from 8-12 month old plants. Stems should be 2-3cm in diameter, brown in color, and free from diseases or pest damage.', 2),
('planting', 'Preparing Cuttings', 'Cut stems into 20-25cm lengths using a sharp knife or machete. Each cutting should have 5-7 nodes. Plant within 24 hours of cutting.', 3),
('planting', 'Planting Method', 'Plant cuttings at 45° angle or horizontally with 2/3 buried in soil. For heavy soils, plant at 45°. For light sandy soils, plant horizontally.', 4);

-- Insert Farming Guides - Crop Management
INSERT INTO farming_guides (category, title, content, order_index) VALUES
('crop_management', 'Weeding Schedule', 'First weeding: 4-6 weeks after planting. Second weeding: 12-14 weeks after planting. Third weeding: 16-20 weeks (if necessary). Keep field weed-free during first 4 months.', 1),
('crop_management', 'Fertilizer Application', 'Apply NPK 17:17:17 at 200kg/acre 4-6 weeks after planting. Side-dress with NPK or manure at 3 months. Organic farmers should apply 5-10 tons of farmyard manure per acre.', 2),
('crop_management', 'Mulching', 'Apply mulch around plants after first weeding to conserve moisture, suppress weeds, and improve soil fertility. Use crop residues, grass, or leaves.', 3),
('crop_management', 'Moisture Management', 'Cassava is drought-tolerant but performs better with adequate moisture. Water during prolonged dry spells, especially in first 3-4 months.', 4);

-- Insert Farming Guides - Irrigation
INSERT INTO farming_guides (category, title, content, order_index) VALUES
('irrigation', 'Water Requirements', 'Cassava requires 1000-1500mm of rainfall annually. Critical water need is during first 3-4 months of establishment.', 1),
('irrigation', 'Drip Irrigation', 'In dry regions, install drip irrigation system with emitters spaced at 1m intervals. Water 2-3 times per week during dry season.', 2),
('irrigation', 'Watering Schedule', 'Water deeply but infrequently. Allow soil to dry slightly between irrigations. Avoid waterlogging which causes root rot.', 3);

-- Insert Farming Guides - Harvesting
INSERT INTO farming_guides (category, title, content, order_index) VALUES
('harvesting', 'Determining Maturity', 'Cassava is ready for harvest when leaves turn yellow and start falling. Maturity ranges from 8-18 months depending on variety.', 1),
('harvesting', 'Harvesting Technique', 'Cut stems 30cm above ground. Loosen soil around plant with hoe or fork. Pull plant gently to avoid breaking roots. Harvest during dry weather.', 2),
('harvesting', 'Expected Yield', 'Average yield: 15-30 tons per acre depending on variety, soil fertility, and management. High-yielding varieties can produce up to 40 tons/acre.', 3);

-- Insert Farming Guides - Post Harvest
INSERT INTO farming_guides (category, title, content, order_index) VALUES
('post_harvest', 'Storage Methods', 'Fresh roots deteriorate within 2-3 days. Process immediately or store in sand/sawdust in cool place for up to 1 week. For longer storage, process into chips or flour.', 1),
('post_harvest', 'Drying Cassava Chips', 'Peel and slice roots into thin chips. Sun-dry on clean surface for 2-3 days until moisture content is below 14%. Store in dry, ventilated bags.', 2),
('post_harvest', 'Cassava Flour Production', 'Peel, wash, and grate cassava roots. Press to remove moisture. Dry the mash and mill into fine flour. Package in moisture-proof bags.', 3),
('post_harvest', 'Transportation', 'Transport fresh cassava in ventilated crates or bags. Avoid bruising roots. Deliver to market or processing facility within 24-48 hours of harvest.', 4);

-- Insert Pests and Diseases
INSERT INTO pests_diseases (name, type, symptoms, control_measures, prevention, severity_level) VALUES
('Cassava Green Mite', 'pest', 'Yellow spots on leaves, leaf curling, stunted growth. Leaves may fall prematurely causing yield loss.', 'Spray with neem-based pesticides. Use resistant varieties. Introduce predatory mites as biological control.', 'Plant resistant varieties. Maintain field hygiene. Practice crop rotation. Regular monitoring.', 'Moderate'),
('Cassava Mealybug', 'pest', 'White cotton-like masses on stems and leaves. Leaves become distorted and yellow. Sooty mold may develop.', 'Spray with soap solution (20g soap per liter). Use systemic insecticides. Introduce natural enemies like parasitoid wasps.', 'Use clean planting material. Regular field inspection. Biological control with natural enemies.', 'High'),
('Cassava Mosaic Disease (CMD)', 'disease', 'Mosaic pattern of yellow and green on leaves. Leaf distortion, stunted plant growth, reduced root size.', 'Remove and destroy infected plants immediately. Plant resistant varieties. Use disease-free cuttings.', 'Use certified disease-free planting material. Plant resistant varieties like TME 419. Control whitefly vectors.', 'Very High'),
('Cassava Brown Streak Disease', 'disease', 'Brown streaks on stems, brown corky patches in roots, leaf yellowing. Makes roots unsuitable for consumption.', 'No cure available. Remove infected plants. Plant resistant varieties like TME 204.', 'Use certified disease-free cuttings. Plant resistant varieties. Control whitefly vectors. Roguing infected plants.', 'Very High'),
('Cassava Bacterial Blight', 'disease', 'Water-soaked spots on leaves, wilting, leaf blight, stem cankers, gum exudation from stems.', 'Use disease-free planting material. Apply copper-based fungicides. Remove and burn infected plants.', 'Use certified clean planting material. Avoid field work when plants are wet. Practice crop rotation.', 'High'),
('White Flies', 'pest', 'Small white insects under leaves. They transmit viral diseases like CMD. Yellowing and weakening of plants.', 'Spray with neem oil or insecticidal soap. Use yellow sticky traps. Apply systemic insecticides if severe.', 'Regular monitoring. Remove alternative host plants. Plant resistant varieties.', 'High'),
('Cassava Root Rot', 'disease', 'Yellowing and wilting of plants. Brown rotting of roots. Plant death in severe cases. Caused by waterlogging.', 'Improve drainage. Avoid planting in waterlogged areas. Remove infected plants. Practice crop rotation.', 'Plant on ridges or mounds. Ensure good drainage. Avoid over-irrigation. Use well-drained soils.', 'Moderate'),
('Termites', 'pest', 'Hollow stems, damaged roots, wilting plants. Visible mud tubes on stems. Can cause complete plant death.', 'Apply termiticides around planting holes. Use organic methods like ash or neem cake. Destroy termite mounds.', 'Clear field properly before planting. Remove all wood debris. Use termite-resistant varieties.', 'Moderate');

-- Insert Fertilizers
INSERT INTO fertilizers (name, type, application_method, recommended_quantity, application_timing, benefits) VALUES
('NPK 17:17:17', 'Inorganic', 'Band application or broadcast around plants, then incorporate into soil', '200kg per acre', '4-6 weeks after planting', 'Provides balanced nutrients for growth. Improves root development and overall yield.'),
('NPK 15:15:15', 'Inorganic', 'Apply in bands 10cm from plant base and cover with soil', '150-200kg per acre', 'At planting and 3 months after', 'Balanced nutrition for vegetative growth and root bulking.'),
('Farmyard Manure', 'Organic', 'Incorporate into soil during land preparation or apply as topdressing', '5-10 tons per acre', 'During land preparation', 'Improves soil structure, water retention, and provides slow-release nutrients.'),
('Compost Manure', 'Organic', 'Mix with soil at planting or apply as mulch around plants', '4-8 tons per acre', 'At planting or as side-dressing', 'Enriches soil with organic matter, improves microbial activity and nutrient availability.'),
('Urea (46% N)', 'Inorganic', 'Side-dressing, apply 10cm from plant and cover with soil', '50-100kg per acre', '6-8 weeks after planting', 'Promotes vigorous leaf growth and canopy development. Increases overall plant vigor.');

-- Insert Processing Methods
INSERT INTO processing_methods (method_name, product_output, description, steps, equipment_needed, processing_time) VALUES
('Cassava Flour Production', 'High Quality Cassava Flour (HQCF)', 'Process fresh cassava roots into fine flour suitable for baking and cooking.', '1. Peel cassava roots\n2. Wash thoroughly\n3. Grate into fine mash\n4. Press to remove moisture\n5. Dry the pressed mash (sun or mechanical)\n6. Mill into fine flour\n7. Sieve to desired fineness\n8. Package in moisture-proof bags', 'Peeling knives, grater, hydraulic press, drying platform/oven, hammer mill, sieves, packaging materials', '2-3 days'),
('Gari Production', 'Gari (fermented cassava granules)', 'Traditional West African processed cassava product with extended shelf life.', '1. Peel and wash cassava\n2. Grate into mash\n3. Fill bags and press for 3-5 days (fermentation)\n4. Sieve to break lumps\n5. Fry in large pots while stirring\n6. Cool and package', 'Peeling knives, grater, pressing bags/weights, sieves, large frying pots, firewood/gas, stirring paddles', '4-6 days'),
('Cassava Starch Production', 'Starch powder', 'Extract pure starch for industrial and food applications.', '1. Peel and wash roots\n2. Grate into fine pulp\n3. Mix with water and filter\n4. Allow starch to settle\n5. Drain water and collect starch\n6. Dry starch\n7. Mill and package', 'Grater, water tanks, filter cloths, settling tanks, drying trays/oven, mill', '3-5 days'),
('Cassava Chips Production', 'Dried cassava chips', 'Dried cassava for animal feed or further processing.', '1. Peel cassava roots\n2. Wash thoroughly\n3. Slice into thin chips (5mm)\n4. Spread on clean drying surface\n5. Sun-dry for 2-3 days\n6. Package in ventilated bags', 'Peeling knives, washing basins, slicing machine/knives, drying mats/platforms, moisture meter', '3-4 days'),
('Cassava Animal Feed', 'Cassava-based animal feed', 'Process cassava into nutritious animal feed supplement.', '1. Produce cassava chips or flour\n2. Mix with protein sources (soybean, fishmeal)\n3. Add vitamins and minerals\n4. Pelletize if desired\n5. Package in feed bags', 'Chipping/milling equipment, mixing machine, pelletizer (optional), weighing scale', '1-2 days');

-- Insert Sample Market Prices
INSERT INTO market_prices (product_type, price_per_kg, region, market_name, date) VALUES
('Fresh Cassava Roots', 0.50, 'Central Region', 'Kampala City Market', CURRENT_DATE),
('Fresh Cassava Roots', 0.45, 'Eastern Region', 'Mbale Main Market', CURRENT_DATE),
('Cassava Flour', 1.20, 'Central Region', 'Kampala City Market', CURRENT_DATE),
('Cassava Flour', 1.10, 'Western Region', 'Mbarara Market', CURRENT_DATE),
('Cassava Chips (Dried)', 0.80, 'Central Region', 'Kampala City Market', CURRENT_DATE),
('Gari', 1.50, 'Northern Region', 'Gulu Market', CURRENT_DATE),
('Cassava Starch', 2.00, 'Central Region', 'Industrial Buyers', CURRENT_DATE);