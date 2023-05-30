import { COORDS_2, COORDS_3 } from './coordinates';
import type {
  WikipediaPageDetails,
  WikipediaPageSummary,
  WikipediaResponse,
} from '../../src/wikipedia/types-internal';

export const WIKIPEDIA_PAGE_SUMMARY_RESPONSE_1: WikipediaResponse<WikipediaPageSummary> =
  {
    batchcomplete: true,
    limits: {
      coordinates: 200,
    },
    query: {
      pages: [
        {
          pageid: 107801,
          ns: 0,
          title: 'Nevada City, California',
          index: -1,
          coordinates: [
            {
              lat: COORDS_2.latitude,
              lon: COORDS_2.longitude,
              primary: true,
              globe: 'earth',
            },
          ],
          thumbnail: {
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg/150px-Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg',
            width: 150,
            height: 100,
          },
          description: 'City in California, United States',
          descriptionsource: 'local',
        },
      ],
    },
  };

export const WIKIPEDIA_PAGE_SUMMARY_RESPONSE_2: WikipediaResponse<WikipediaPageSummary> =
  {
    batchcomplete: true,
    limits: {
      coordinates: 200,
    },
    query: {
      pages: [
        {
          pageid: 107801,
          ns: 0,
          title: 'Nevada City, California',
          index: -1,
          coordinates: [
            {
              lat: COORDS_2.latitude,
              lon: COORDS_2.longitude,
              primary: true,
              globe: 'earth',
            },
          ],
          thumbnail: {
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg/150px-Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg',
            width: 150,
            height: 100,
          },
          description: 'City in California, United States',
          descriptionsource: 'local',
        },
        {
          pageid: 18536138,
          ns: 0,
          title: 'Nevada Theatre',
          index: 1,
          coordinates: [
            {
              lat: COORDS_3.latitude,
              lon: COORDS_3.longitude,
              primary: true,
              globe: 'earth',
            },
          ],
          thumbnail: {
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Nevada_Theater-4.jpg/150px-Nevada_Theater-4.jpg',
            width: 150,
            height: 100,
          },
          description: 'United States historic place',
          descriptionsource: 'local',
        },
      ],
    },
  };

export const WIKIPEDIA_PAGE_DETAILS_RESPONSE_1: WikipediaResponse<WikipediaPageDetails> =
  {
    batchcomplete: true,
    limits: {
      coordinates: 200,
    },
    query: {
      pages: [
        {
          pageid: 107801,
          ns: 0,
          title: 'Nevada City, California',
          coordinates: [
            {
              lat: COORDS_2.latitude,
              lon: COORDS_2.longitude,
              primary: true,
              globe: 'earth',
            },
          ],
          thumbnail: {
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg/150px-Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg',
            width: 150,
            height: 100,
          },
          description: 'City in California, United States',
          descriptionsource: 'local',
          extract:
            "Nevada City (originally, Ustumah, a Nisenan village; later, Nevada, Deer Creek Dry Diggins, and Caldwell's Upper Store) is the county seat of Nevada County, California, United States, 60 miles (97 km) northeast of Sacramento, 84 miles (135 km) southwest of Reno and 147 miles (237 km) northeast of San Francisco.",
        },
      ],
    },
  };

export const LONG_EXTRACT_1 =
  "Nevada City (originally, Ustumah, a Nisenan village; later, Nevada, Deer Creek Dry Diggins, and Caldwell's Upper Store) is the county seat of Nevada County, California, United States, 60 miles (97 km) northeast of Sacramento, 84 miles (135 km) southwest of Reno and 147 miles (237 km) northeast of San Francisco. The population was 3,068 as of the 2010 Census.\\n\\n\\n== History ==\\n\\nEuropean-Americans first settled Nevada City in 1849, during the California Gold Rush, as Nevada (Spanish for \\\"snow-covered\\\", a reference to the snow-topped mountains in the area). The Gold Tunnel on the north side of Deer Creek was the city's first mine, built in 1850. The first sawmill in Nevada City was built on Deer Creek, just above town, in August 1850, by Lewis & Son, with a water wheel. In 1850–51, Nevada City was the state's most important mining town, and Nevada County the state's leading gold-mining county. In 1851, The Nevada Journal became the first newspaper published in the town and county. The first cemetery in town, the Pioneer Cemetery, was founded around 1851 behind the Nevada City United Methodist Church, Nevada County's first denominational church.The town of Nevada was incorporated on April 19, 1856. In 1864, the word “City” was added to its name to relieve confusion with the nearby state of Nevada, and the town has legally been known as Nevada City ever since. The former town of Coyoteville later became Nevada City's northwestern section.\\n\\n\\n== Buildings and structures ==\\n\\nThe Nevada City Downtown Historic District covers the downtown section roughly bounded by Spring, Bridge, Commercial, York, Washington, Coyote, and Main Streets. Several historical buildings have received National Register of Historic Places or California Historical Landmark status, and have been preserved. These include:\\n\\nCourt house and city hall Art Moderne facades are attributable to Works Progress Administration projects.\\nDoris Foley Library for Historical Research (NRHP No. 90001809), 211 North Pine Street, is a Carnegie library.\\nMiners Foundry (CHL No. 1012), 325 Spring Street, was the first manufacturing location of the Pelton wheel.\\nNational Hotel (CHL No. 899), 211 Broad Street, is one of the oldest continuously operating hotels west of the Rocky Mountains.\\nNevada City Firehouse No. 2\\nNevada Brewery (NRHP No. 85002303), 107 Sacramento Street, was used for brewing and serving lager beer to the mining community.\\nNevada Theatre (CHL No. 863), 401 Broad Street, is California's oldest original-use theatre.\\nSouth Yuba Canal Office (CHL No. 832), 134 Main Street, was used during the period of 1857 to 1880.\\n\\n\\n== Geography ==\\nNevada City is located at 39°15′41″N 121°01′07″W at 2,500 feet above sea level.\\nAccording to the United States Census Bureau, the city has an area of 2.2 square miles (5.7 km2), 99.83% of it land and 0.17% water.\\nNevada, Missouri, is named after Nevada City.Most of Nevada City lies on brown sandy loam soils of the Hoda series which developed on granitic rock.\\n\\n\\n== Demographics ==\\n\\n\\n=== 2010 ===\\nThe 2010 United States Census reported that Nevada City had a population of 3,068. The population density was 1,399.7 inhabitants per square mile (540.4/km2). The racial makeup of Nevada City was 2,837 (92.5%) White, 26 (0.8%) African American, 28 (0.9%) Native American, 46 (1.5%) Asian, 0 (0%) Pacific Islander, 40 (1.3%) from other races, and 91 (0.4%) from two or more races. Hispanic or Latino of any race were 205 persons (6.7%).\\nThe Census reported that 2,829 people (92.2% of the population) lived in households, 56 (1.8%) lived in non-institutionalized group quarters, and 183 (6.0%) were institutionalized.\\nThere were 1,356 households, out of which 317 (23.4%) had children under the age of 18 living in them, 510 (37.6%) were opposite-sex married couples living together, 155 (11.4%) had a female householder with no husband present, 79 (5.8%) had a male householder with no wife present.  There were 97 (7.2%) unmarried opposite-sex partnerships, and 15 (1.1%) same-sex married couples or partnerships. 488 households (36.0%) were made up of individuals, and 168 (12.4%) had someone living alone who was 65 years of age or older. The average household size was 2.09.  There were 744 families (54.9% of all households); the average family size was 2.67.\\nThe population was spread out, with 517 people (16.9%) under the age of 18, 199 people (6.5%) aged 18 to 24, 720 people (23.5%) aged 25 to 44, 1,075 people (35.0%) aged 45 to 64, and 557 people (18.2%) who were 65 years of age or older.  The median age was 47.5 years. For every 100 females, there were 100.4 males.  For every 100 females age 18 and over, there were 101.8 males.\\nThere were 1,510 housing units at an average density of 688.9 per square mile (266.0/km2), of which 786 (58.0%) were owner-occupied, and 570 (42.0%) were occupied by renters. The homeowner vacancy rate was 3.8%; the rental vacancy rate was 4.8%.  1,678 people (54.7% of the population) lived in owner-occupied housing units and 1,151 people (37.5%) lived in rental housing units.\\n\\n\\n=== 2000 ===\\nAs of the census of 2000, there were 3,001 people, 1,313 households, and 740 families residing in the city.  The population density was 1,425.0 inhabitants per square mile (550.2/km2).  There were 1,415 housing units at an average density of 671.9 per square mile (259.4/km2).  The racial makeup of the city was 94.3% White, 0.4% African American, 1.4% Native American, 0.7% Asian, <0.1% Pacific Islander, 0.7% from other races, and 2.4% from two or more races. Hispanic or Latino of any race were 3.5% of the population.\\nThere were 1,313 households, out of which 25.4% had children under the age of 18 living with them, 38.1% were married couples living together, 13.3% had a female householder with no husband present, and 43.6% were non-families. 35.0% of all households were made up of individuals, and 10.4% had someone living alone who was 65 years of age or older.  The average household size was 2.14 and the average family size was 2.71.\\nIn the city, the population was spread out, with 19.7% under the age of 18, 7.4% from 18 to 24, 25.9% from 25 to 44, 32.2% from 45 to 64, and 14.9% who were 65 years of age or older.  The median age was 44 years. For every 100 females, there were 97.2 males.  For every 100 females age 18 and over, there were 95.4 males.\\nThe median income for a household in the city was $36,667, and the median income for a family was $46,149. Males had a median income of $32,070 versus $29,183 for females. The per capita income for the city was $22,399.  About 1.7% of families and 7.9% of the population were below the poverty line, including 2.5% of those under age 18 and 3.8% of those age 65 or over.\\n\\n\\n== Government ==\\nNevada City elects a five-member city council. Council members select the mayor and vice mayor from their ranks. Council members appoint residents to a five-member Planning Commission.\\nNevada City launched a \\\"Goat Fund Me\\\" campaign to raise $25,000 to have goats graze through dense brush in the municipal greenbelt. Nevada City is considered particularly at risk of wildfire, a \\\"very high fire hazard severity zone\\\" because of its wooded steep hillsides, narrow streets, 19th-century Gold Rush-era homes, and thick tree canopy.\\n\\n\\n=== County, state, and federal representation ===\\nNevada City is in Nevada County. The District 1 Supervisor is Heidi Hall.In the state legislature, Nevada City is in the  1st Senate District, represented by Republican Brian Dahle, and the  1st Assembly District, represented by Republican Megan Dahle.Nevada City is in California's  1st congressional district, represented by Republican Doug LaMalfa.According to the California Secretary of State, as of February 10, 2019, Nevada City has 2,353 registered voters. Of those, 1,225 (52.1%) are registered Democrats, 384 (16.3%) are registered Republicans, and 297 (12.6%) have declined to state a political party.\\n\\n\\n== Economy ==\\n\\nTourism, government services, digital media industry, resource extraction (timber) and commercial services are the basis of the local economy..\\n\\n\\n=== Tourism ===\\nTourists visit Nevada City for outdoor recreation, history, fine arts and entertainment and special events. Nevada City attracts vacationers in all four seasons and is a popular weekend getaway for visitors in Northern California and Nevada. Nevada City serves as a base for recreation in the nearby Tahoe National Forest, South Yuba River and the High Sierras. It is 45 minutes from Donner Summit area skiing and 60–90 minutes from Lake Tahoe ski areas. Nevada City's tourist attractions include:\\n\\nSouth Yuba River State Park — Four season hiking and gold panning, spring whitewater boating and summer/fall swimming on the federally designated Wild and Scenic South Yuba River.\\nHistoric downtown area — Much of the city's downtown area (bisected by Broad Street) is in the National Register of Historic Places. Most of the buildings date from the 19th century.\\nThe Nevada City Classic — Since 1960, downtown is the site for a challenging professional cycling race. Races for juniors, men, and women usually take place on Father's Day Weekend. The race attracts thousands of visitors. In June 2009, Lance Armstrong was the winner.\\nNevada City Winery was the first bonded winery to open in Nevada County after Prohibition.\\n\\n\\n== Culture ==\\nLive music, theater and dance are performed nearly continually at Miners Foundry Cultural Center and the Nevada Theatre.\\n\\n\\n=== Museums and galleries ===\\nThe Nevada County Historical Society operates Historic Firehouse No. 1 Museum downtown and the Nevada County Narrow Gauge Railroad & Transportation Museum in the Seven Hills Business District area. The Miners Foundry Cultural Center has a small museum. Many businesses also have displays of photos and historic artifacts dating to the Gold Rush and pioneer eras. Several art galleries and businesses exhibit fine art.\\n\\n\\n=== Recurring events ===\\nSeveral major cultural events occur annually, including Victorian Christmas (street fair), Summer Nights (street fair), Mardi Gras, Fourth of July Parade, Teddy Bear Convention, and Psychic Faire.\\n\\nThe Constitution Day Parade is held the second Sunday of September since 1967. It is one of the oldest and largest Constitution observances in the western United States. The event features youth, business and nonprofit entries, the Ophir Prison Marching Kazoo Band and, since 1987, the Famous Marching Presidents (and their First Ladies).\\nWild & Scenic Film Festival — Beginning in 2003, the festival has showcased films on a full range of environmental issues and films emphasizing outdoor adventure and extreme sports. The event takes place in January and occupies multiple venues in downtown Nevada City. It has become one of the largest film festivals of its kind in the nation.\\nNevada City Film Festival — Started in 2001, the festival has grown from a showcase for local filmmakers to an international film festival hosting notable filmmakers from around the country including director Mike Mills (Thumbsucker, The Beginners), director Jonathan Krisel (Portlandia), actress and comedian Natasha Leggero (Last Comic Standing), and Tim Heidecker and Eric Wareheim of Tim and Eric Awesome Show, Great Job! The annual festival is held over the course of four days in August. The Nevada City Film Festival has been called \\\"The Sundance of the Foothills\\\".\\nNevada City Storytelling Festival — At the North Columbia Schoolhouse Cultural Center in nearby North Columbia, the festival has attracted major national and regional storytellers since 1985. The event takes place each July in a pine-shaded amphitheater built specifically for storytelling.\\nSummer Nights – An outdoor street festival of art and music held several Wednesday evenings in July. During Summer Nights, Nevada City's landmark historic district is closed to motorized traffic and filled with arts, crafts, classic cars, food, drink and music.\\nVictorian Christmas – This annual family tradition takes place two Wednesday evenings and three Sunday afternoons in December, and features holiday activities for all ages: carriage rides, arts & crafts, live entertainment, and savory yuletide treats and libations. The streets of downtown Nevada City are closed to motorized traffic for Victorian Christmas.\\n\\n\\n== Twin town ==\\nNevada City is twinned with Penzance, a seaside town in Cornwall, UK, and the nearby tin and copper mining town of St Just in Penwith, Cornwall, UK. The twinning is a result of Cornish migration during the Californian gold rush in which Cornish mining expertise migrated to the area. City Hall has a room dedicated to the twinning and houses Cornish memorabilia and items donated on various exchanges. Penzance Youth Wind Band has joined forces with Nevada Union High School's instrumental music department on two occasions.\\n\\n\\n== Film location ==\\nAn abundance of historic buildings, autumn leaf color and attractive natural surroundings have made Nevada City an ongoing setting for film and television productions, including feature films and commercials. The area is also a popular location for photography. Modern-day Nevada City was the setting for the 2006 Hallmark Channel original movie, The Christmas Card.\\n\\n\\n== Education ==\\nNevada City has its own school district with three schools: Deer Creek (K-4), Seven Hills (5–8) and Nevada City Charter School (K-8). Other large schools in the area include Nevada City School of the Arts, Yuba River Charter School, and Forest Charter SchoolAfter 8th grade, most students attend Nevada Union High School in nearby Grass Valley as part of the Nevada Joint Union School District. Other high schools in the area include Silver Springs High School, Ghidotti High School, Sierra Academy of Expeditionary Learning, Forest Charter, Bitney Prep High School, Bear River, and other smaller private and charter schools.\\n\\n\\n=== Higher education ===\\nOther local schools include the California College of Ayurveda and Connected Communities Academy.\\n\\n\\n== Climate ==\\nOwing to its exposed location on the western slopes of the Sierra Nevada, Nevada City receives moderate to heavy rainfall for California at 59 inches (1.5 m), though its climate is otherwise fairly typical for the state, classified as Mediterranean (Csa/Csb). Although exceedingly heavy snow falls on the nearby mountains, it rarely falls in the city. During a typical year, there are 31 days with temperatures of 90 °F (32 °C) or higher, 75 freezing nights, and 60 days where the temperature fails to reach 50 °F (10 °C). The record high temperature is 111 °F (44 °C), set on August 14, 1933, and the record low is −1 °F (−18 °C), set on January 21, 1937, and on December 9, 1972.\\n\\n\\n== Notable people ==\\n\\n\\n== Downtown gallery ==\\n\\n\\t\\t\\n\\t\\t\\n\\t\\t\\n\\n\\n== See also ==\\nScotts Flat Lake\\nTahoe National Forest\\nYuba River\\nThe Willo Steakhouse\\n\\n\\n== References ==\\n\\n\\n== Further reading ==\\nDavis, H. P. (1940). National hotel and coffee shop, Nevada City, California.\\nHagaman, W. R. (2001). A short history of the Chinese cemetery at Nevada City, California: and Chinese burial customs during the Gold Rush. Nevada City, CA: Cowboy Press.\\nHattich, L. (1969). Feasibility study on Nevada City Theater, Nevada City, California. Boulder, Colo: Economic Development Internship Program, Western Interstate Commission for Higher Education.\\nHidden Nugget Placer Mining Co. (1910). Hidden Nugget Placer Mining Company, Nevada City, California. Nevada City, CAlif: The Company.\\nMann, R. (1982). After the Gold Rush: society in Grass Valley and Nevada City, California, 1849–1870. Stanford, Calif: Stanford University Press.\\nMarsh, Martin Keith (2001). The Yellowjackets: A History of Nevada City High School Football (1901–1951). Grass Valley, CA: Cottage Hill. ISBN 978-0-9658240-2-6.\\nNevada City Chamber of Commerce. (1932). Homes among the hills: Nevada City, California : gold, health, happiness. Nevada City, Calif.?: Nevada City Chamber of Commerce?.\\n\\n\\n== External links ==\\n\\nNevada City, California at Curlie\\nOfficial website \\nNevada City Chamber of Commerce\\nNevada City at Western Mining History. Accessed 8/22/2021.";
