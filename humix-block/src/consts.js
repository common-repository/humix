export const EZHX_REGEX = /^https?:\/\/(www\.)?(humix\.com\/[\w-]{11,}|humix\.com\/(@?[\w-]+\/)?video\/(playlist\/)?[\w-]{11,}|[\w.-]+\/humix\/video\/(playlist\/)?[\w-]{11,})([\?|\&]?[\w]+=[\w-]*)*$/;
export const OEMBED_BASE = "https://humix.com/humix/oembed?url=";
export const EZHX_GENERATE_EMBED_CODE_BASE = "https://www.humix.com/generate-embed-code?j=";
export const VIDEO_CATEGORY_LIMIT = 3;
export const FEEDBACK_LINK = "https://forms.gle/veiWWjFp1Bya8JEm8";

// Static asset from NLP Category DB
export const VIDEO_CATEGORIES = [{
    id:  2,
    label: "Arts & Entertainment",
    children: [{
      id:  3,
      label: "Celebrities & Entertainment News"
    }, {
      id:  4,
      label: "Comics & Animation",
      children: [{
        id: 5,
        label: "Anime & Manga"
      }, {
        id: 6,
        label: "Cartoons"
      }, {
        id: 7,
        label: "Comics"
      }, {
        id: 622,
        label: "Other"
      }]
    }, {
      id:  8,
      label: "Entertainment Industry",
      children: [{
        id: 9,
        label: "Film & TV Industry"
      }, {
        id: 10,
        label: "Recording Industry"
      }, {
        id: 623,
        label: "Other"
      }]
    }, {
      id:  11,
      label: "Events & Listings",
      children: [{
        id: 12,
        label: "Bars, Clubs & Nightlife"
      }, {
        id: 13,
        label: "Concerts & Music Festivals"
      }, {
        id: 14,
        label: "Expos & Conventions"
      }, {
        id: 15,
        label: "Film Festivals"
      }, {
        id: 16,
        label: "Movie Listings & Theater Showtimes"
      }, {
        id: 624,
        label: "Event Ticket Sales"
      }, {
        id: 625,
        label: "Food & Beverage Events"
      }, {
        id: 626,
        label: "Live Sporting Events"
      }, {
        id: 627,
        label: "Other"
      }]
    }, {
      id:  17,
      label: "Fun & Trivia",
      children: [{
        id: 18,
        label: "Flash-Based Entertainment"
      }, {
        id: 19,
        label: "Fun Tests & Silly Surveys"
      }, {
        id: 628,
        label: "Other"
      }]
    }, {
      id:  20,
      label: "Humor",
      children: [{
        id: 21,
        label: "Funny Pictures & Videos"
      }, {
        id: 22,
        label: "Political Humor"
      }, {
        id: 629,
        label: "Live Comedy"
      }, {
        id: 630,
        label: "Spoofs & Satire"
      }, {
        id: 631,
        label: "Other"
      }]
    }, {
      id:  23,
      label: "Movies",
      children: [{
        id: 632,
        label: "Action & Adventure Films"
      }, {
        id: 633,
        label: "Animated Films"
      }, {
        id: 634,
        label: "Bollywood & South Asian Films"
      }, {
        id: 635,
        label: "Classic Films"
      }, {
        id: 636,
        label: "Comedy Films"
      }, {
        id: 637,
        label: "Cult & Indie Films"
      }, {
        id: 638,
        label: "Documentary Films"
      }, {
        id: 639,
        label: "Drama Films"
      }, {
        id: 640,
        label: "DVD & Video Shopping"
      }, {
        id: 641,
        label: "Family Films"
      }, {
        id: 642,
        label: "Horror Films"
      }, {
        id: 643,
        label: "Movie Memorabilia"
      }, {
        id: 644,
        label: "Movie Reference"
      }, {
        id: 645,
        label: "Musical Films"
      }, {
        id: 646,
        label: "Romance Films"
      }, {
        id: 647,
        label: "Science Fiction & Fantasy Films"
      }, {
        id: 648,
        label: "Thriller, Crime & Mystery Films"
      }, {
        id: 649,
        label: "Other"
      }]
    }, {
      id:  24,
      label: "Music & Audio",
      children: [{
        id: 25,
        label: "CD & Audio Shopping"
      }, {
        id: 26,
        label: "Classical Music"
      }, {
        id: 27,
        label: "Country Music"
      }, {
        id: 28,
        label: "Dance & Electronic Music"
      }, {
        id: 29,
        label: "Experimental & Industrial Music"
      }, {
        id: 30,
        label: "Jazz & Blues"
      }, {
        id: 31,
        label: "Music Education & Instruction"
      }, {
        id: 32,
        label: "Music Equipment & Technology"
      }, {
        id: 33,
        label: "Music Reference"
      }, {
        id: 34,
        label: "Music Streams & Downloads"
      }, {
        id: 35,
        label: "Music Videos"
      }, {
        id: 36,
        label: "Pop Music"
      }, {
        id: 37,
        label: "Radio"
      }, {
        id: 38,
        label: "Religious Music"
      }, {
        id: 39,
        label: "Rock Music"
      }, {
        id: 40,
        label: "Soundtracks"
      }, {
        id: 41,
        label: "Urban & Hip-Hop"
      }, {
        id: 42,
        label: "World Music"
      }, {
        id: 650,
        label: "Folk & Traditional Music"
      }, {
        id: 651,
        label: "Music Art & Memorabilia"
      }, {
        id: 652,
        label: "Podcasts"
      }, {
        id: 653,
        label: "Vocals & Show Tunes"
      }, {
        id: 654,
        label: "Other"
      }]
    }, {
      id:  43,
      label: "Offbeat",
      children: [{
        id: 44,
        label: "Occult & Paranormal"
      }, {
        id: 655,
        label: "Other"
      }]
    }, {
      id:  45,
      label: "Online Media",
      children: [{
        id: 46,
        label: "Online Image Galleries"
      }, {
        id: 656,
        label: "Virtual Tours"
      }, {
        id: 657,
        label: "Other"
      }]
    }, {
      id:  47,
      label: "Performing Arts",
      children: [{
        id: 48,
        label: "Acting & Theater"
      }, {
        id: 49,
        label: "Circus"
      }, {
        id: 50,
        label: "Dance"
      }, {
        id: 51,
        label: "Magic"
      }, {
        id: 52,
        label: "Opera"
      }, {
        id: 658,
        label: "Broadway & Musical Theater"
      }, {
        id: 659,
        label: "Other"
      }]
    }, {
      id:  53,
      label: "TV & Video",
      children: [{
        id: 54,
        label: "Online Video"
      }, {
        id: 55,
        label: "TV Commercials"
      }, {
        id: 56,
        label: "TV Shows & Programs"
      }, {
        id: 660,
        label: "TV Guides & Reference"
      }, {
        id: 661,
        label: "TV Networks & Stations"
      }, {
        id: 662,
        label: "Other"
      }]
    }, {
      id:  57,
      label: "Visual Art & Design",
      children: [{
        id: 58,
        label: "Architecture"
      }, {
        id: 59,
        label: "Art Museums & Galleries"
      }, {
        id: 60,
        label: "Design"
      }, {
        id: 61,
        label: "Painting"
      }, {
        id: 62,
        label: "Photographic & Digital Arts"
      }, {
        id: 663,
        label: "Sculpture"
      }, {
        id: 664,
        label: "Visual Arts & Design Education"
      }, {
        id: 665,
        label: "Other"
      }]
    }, {
      id:  621,
      label: "Other"
    }]
  }, {
    id:  63,
    label: "Autos & Vehicles",
    children: [{
      id:  64,
      label: "Bicycles & Accessories",
      children: [{
        id: 65,
        label: "Bike Parts & Repair"
      }, {
        id: 66,
        label: "BMX Bikes"
      }, {
        id: 667,
        label: "Bike Accessories"
      }, {
        id: 668,
        label: "Bike Frames"
      }, {
        id: 669,
        label: "Bike Helmets & Protective Gear"
      }, {
        id: 670,
        label: "Cruiser Bicycles"
      }, {
        id: 671,
        label: "Electric Bicycles"
      }, {
        id: 672,
        label: "Kids' Bikes"
      }, {
        id: 673,
        label: "Mountain Bikes"
      }, {
        id: 674,
        label: "Road Bikes"
      }, {
        id: 675,
        label: "Other"
      }]
    }, {
      id:  67,
      label: "Boats & Watercraft"
    }, {
      id:  68,
      label: "Campers & RVs"
    }, {
      id:  69,
      label: "Classic Vehicles"
    }, {
      id:  70,
      label: "Cargo Trucks & Trailers"
    }, {
      id:  71,
      label: "Motor Vehicles (By Type)",
      children: [{
        id: 72,
        label: "Hybrid & Alternative Vehicles"
      }, {
        id: 73,
        label: "Motorcycles"
      }, {
        id: 74,
        label: "Off-Road Vehicles"
      }, {
        id: 75,
        label: "Trucks & SUVs"
      }, {
        id: 727,
        label: "Autonomous Vehicles"
      }, {
        id: 728,
        label: "Compact Cars"
      }, {
        id: 729,
        label: "Convertibles"
      }, {
        id: 730,
        label: "Coupes"
      }, {
        id: 731,
        label: "Diesel Vehicles"
      }, {
        id: 732,
        label: "Hatchbacks"
      }, {
        id: 733,
        label: "Luxury Vehicles"
      }, {
        id: 734,
        label: "Microcars & Subcompacts"
      }, {
        id: 735,
        label: "Scooters & Mopeds"
      }, {
        id: 736,
        label: "Sedans"
      }, {
        id: 737,
        label: "Sports Cars"
      }, {
        id: 738,
        label: "Station Wagons"
      }, {
        id: 739,
        label: "Trucks, Vans & SUVs"
      }, {
        id: 740,
        label: "Other"
      }]
    }, {
      id:  76,
      label: "Vehicle Codes & Driving Laws",
      children: [{
        id: 77,
        label: "Vehicle Licensing & Registration"
      }, {
        id: 742,
        label: "Drunk Driving Law"
      }, {
        id: 743,
        label: "Other"
      }]
    }, {
      id:  78,
      label: "Vehicle Parts & Services",
      children: [{
        id: 79,
        label: "Gas Prices & Vehicle Fueling"
      }, {
        id: 80,
        label: "Vehicle Parts & Accessories"
      }, {
        id: 81,
        label: "Vehicle Repair & Maintenance"
      }, {
        id: 744,
        label: "Towing & Roadside Assistance"
      }, {
        id: 745,
        label: "Vehicle Modification & Tuning"
      }, {
        id: 746,
        label: "Other"
      }]
    }, {
      id:  82,
      label: "Vehicle Shopping",
      children: [{
        id: 83,
        label: "Used Vehicles"
      }, {
        id: 747,
        label: "Vehicle Dealers & Retailers"
      }, {
        id: 748,
        label: "Vehicle Specs, Reviews & Comparisons"
      }, {
        id: 749,
        label: "Other"
      }]
    }, {
      id:  84,
      label: "Vehicle Shows"
    }, {
      id:  666,
      label: "Other"
    }, {
      id:  676,
      label: "Other"
    }, {
      id:  677,
      label: "Custom & Performance Vehicles"
    }, {
      id:  678,
      label: "Audi",
      children: [{
        id: 679,
        label: "Bentley"
      }, {
        id: 680,
        label: "BMW"
      }, {
        id: 681,
        label: "Buick"
      }, {
        id: 682,
        label: "Cadillac"
      }, {
        id: 683,
        label: "Chevrolet"
      }, {
        id: 684,
        label: "Chrysler"
      }, {
        id: 685,
        label: "Citroën"
      }, {
        id: 686,
        label: "Daewoo Motors"
      }, {
        id: 687,
        label: "Dodge"
      }, {
        id: 688,
        label: "Ferrari"
      }, {
        id: 689,
        label: "Fiat"
      }, {
        id: 690,
        label: "Ford"
      }, {
        id: 691,
        label: "GMC"
      }, {
        id: 692,
        label: "Honda"
      }, {
        id: 693,
        label: "Hummer"
      }, {
        id: 694,
        label: "Hyundai"
      }, {
        id: 695,
        label: "Isuzu"
      }, {
        id: 696,
        label: "Jaguar"
      }, {
        id: 697,
        label: "Jeep"
      }, {
        id: 698,
        label: "Kia"
      }, {
        id: 699,
        label: "Lamborghini"
      }, {
        id: 700,
        label: "Land Rover"
      }, {
        id: 701,
        label: "Lincoln"
      }, {
        id: 702,
        label: "Maserati"
      }, {
        id: 703,
        label: "Mazda"
      }, {
        id: 704,
        label: "Mercedes-Benz"
      }, {
        id: 705,
        label: "Mercury"
      }, {
        id: 706,
        label: "Mini"
      }, {
        id: 707,
        label: "Mitsubishi"
      }, {
        id: 708,
        label: "Nissan"
      }, {
        id: 709,
        label: "Peugeot"
      }, {
        id: 710,
        label: "Pontiac"
      }, {
        id: 711,
        label: "Porsche"
      }, {
        id: 712,
        label: "Ram Trucks"
      }, {
        id: 713,
        label: "Renault"
      }, {
        id: 714,
        label: "Rolls-Royce"
      }, {
        id: 715,
        label: "Saab"
      }, {
        id: 716,
        label: "Saturn"
      }, {
        id: 717,
        label: "SEAT"
      }, {
        id: 718,
        label: "Skoda"
      }, {
        id: 719,
        label: "Subaru"
      }, {
        id: 720,
        label: "Suzuki"
      }, {
        id: 721,
        label: "Tesla Motors"
      }, {
        id: 722,
        label: "Toyota"
      }, {
        id: 723,
        label: "Vauxhall-Opel"
      }, {
        id: 724,
        label: "Volkswagen"
      }, {
        id: 725,
        label: "Volvo"
      }, {
        id: 726,
        label: "Other"
      }]
    }, {
      id:  741,
      label: "Personal Aircraft"
    }]
  }, {
    id:  85,
    label: "Beauty & Fitness",
    children: [{
      id:  86,
      label: "Beauty Pageants"
    }, {
      id:  87,
      label: "Body Art"
    }, {
      id:  88,
      label: "Cosmetic Procedures",
      children: [{
        id: 89,
        label: "Cosmetic Surgery"
      }]
    }, {
      id:  90,
      label: "Cosmetology & Beauty Professionals"
    }, {
      id:  91,
      label: "Face & Body Care",
      children: [{
        id: 92,
        label: "Hygiene & Toiletries"
      }, {
        id: 93,
        label: "Make-Up & Cosmetics"
      }, {
        id: 94,
        label: "Perfumes & Fragrances"
      }, {
        id: 95,
        label: "Skin & Nail Care"
      }, {
        id: 96,
        label: "Unwanted Body & Facial Hair Removal"
      }, {
        id: 755,
        label: "Clean Beauty"
      }, {
        id: 756,
        label: "Sun Care & Tanning Products"
      }, {
        id: 757,
        label: "Other"
      }]
    }, {
      id:  97,
      label: "Fashion & Style",
      children: [{
        id: 98,
        label: "Fashion Designers & Collections"
      }, {
        id: 758,
        label: "Other"
      }]
    }, {
      id:  99,
      label: "Fitness",
      children: [{
        id: 759,
        label: "Bodybuilding"
      }, {
        id: 760,
        label: "Fitness Equipment & Accessories"
      }, {
        id: 761,
        label: "Fitness Instruction & Personal Training"
      }, {
        id: 762,
        label: "Gyms & Health Clubs"
      }, {
        id: 763,
        label: "High Intensity Interval Training"
      }, {
        id: 764,
        label: "Yoga & Pilates"
      }, {
        id: 765,
        label: "Other"
      }]
    }, {
      id:  100,
      label: "Hair Care",
      children: [{
        id: 101,
        label: "Hair Loss"
      }, {
        id: 766,
        label: "Shampoos & Conditioners"
      }, {
        id: 767,
        label: "Other"
      }]
    }, {
      id:  102,
      label: "Spas & Beauty Services",
      children: [{
        id: 103,
        label: "Massage Therapy"
      }]
    }, {
      id:  104,
      label: "Weight Loss"
    }, {
      id:  750,
      label: "Other"
    }, {
      id:  751,
      label: "Cosmetic Procedures",
      children: [{
        id: 752,
        label: "Manicures & Pedicures"
      }, {
        id: 753,
        label: "Massage Therapy"
      }, {
        id: 754,
        label: "Other"
      }]
    }]
  }, {
    id:  105,
    label: "Books & Literature",
    children: [{
      id:  106,
      label: "Children's Literature"
    }, {
      id:  107,
      label: "E-Books"
    }, {
      id:  108,
      label: "Fan Fiction"
    }, {
      id:  109,
      label: "Literary Classics"
    }, {
      id:  110,
      label: "Poetry"
    }, {
      id:  111,
      label: "Writers Resources"
    }, {
      id:  768,
      label: "Audiobooks"
    }, {
      id:  769,
      label: "Book Retailers"
    }, {
      id:  770,
      label: "Other"
    }]
  }, {
    id:  112,
    label: "Business & Industrial",
    children: [{
      id:  113,
      label: "Public Relations"
    }, {
      id:  114,
      label: "Space Technology"
    }, {
      id:  115,
      label: "Agriculture & Forestry",
      children: [{
        id: 116,
        label: "Agricultural Equipment"
      }, {
        id: 117,
        label: "Forestry"
      }, {
        id: 118,
        label: "Livestock"
      }, {
        id: 779,
        label: "Aquaculture"
      }, {
        id: 780,
        label: "Crops & Seed"
      }, {
        id: 781,
        label: "Farms & Ranches"
      }, {
        id: 782,
        label: "Other"
      }]
    }, {
      id:  119,
      label: "Automotive Industry"
    }, {
      id:  120,
      label: "Business Education"
    }, {
      id:  121,
      label: "Business Finance",
      children: [{
        id: 122,
        label: "Venture Capital"
      }, {
        id: 783,
        label: "Commercial Lending"
      }, {
        id: 784,
        label: "Investment Banking"
      }, {
        id: 785,
        label: "Risk Management"
      }, {
        id: 786,
        label: "Other"
      }]
    }, {
      id:  123,
      label: "Business Operations",
      children: [{
        id: 124,
        label: "Business Plans & Presentations"
      }, {
        id: 125,
        label: "Management"
      }, {
        id: 787,
        label: "Flexible Work Arrangements"
      }, {
        id: 788,
        label: "Human Resources"
      }, {
        id: 789,
        label: "Other"
      }]
    }, {
      id:  126,
      label: "Business Services",
      children: [{
        id: 127,
        label: "Consulting"
      }, {
        id: 128,
        label: "Corporate Events"
      }, {
        id: 129,
        label: "E-Commerce Services"
      }, {
        id: 130,
        label: "Fire & Security Services"
      }, {
        id: 131,
        label: "Office Services"
      }, {
        id: 132,
        label: "Office Supplies"
      }, {
        id: 133,
        label: "Writing & Editing Services"
      }, {
        id: 790,
        label: "Commercial Distribution"
      }, {
        id: 791,
        label: "Knowledge Management"
      }, {
        id: 792,
        label: "Outsourcing"
      }, {
        id: 793,
        label: "Physical Asset Management"
      }, {
        id: 794,
        label: "Quality Control & Tracking"
      }, {
        id: 795,
        label: "Shared Workspaces"
      }, {
        id: 796,
        label: "Signage"
      }, {
        id: 797,
        label: "Warehousing"
      }, {
        id: 798,
        label: "Other"
      }]
    }, {
      id:  134,
      label: "Chemicals Industry",
      children: [{
        id: 135,
        label: "Cleaning Agents"
      }, {
        id: 136,
        label: "Plastics & Polymers"
      }, {
        id: 799,
        label: "Agrochemicals"
      }, {
        id: 800,
        label: "Coatings & Adhesives"
      }, {
        id: 801,
        label: "Dyes & Pigments"
      }, {
        id: 802,
        label: "Other"
      }]
    }, {
      id:  137,
      label: "Construction & Maintenance",
      children: [{
        id: 138,
        label: "Building Materials & Supplies"
      }, {
        id: 803,
        label: "Civil Engineering"
      }, {
        id: 804,
        label: "Other"
      }]
    }, {
      id:  139,
      label: "Energy & Utilities",
      children: [{
        id: 140,
        label: "Electricity"
      }, {
        id: 141,
        label: "Oil & Gas"
      }, {
        id: 142,
        label: "Renewable & Alternative Energy"
      }, {
        id: 805,
        label: "Nuclear Energy"
      }, {
        id: 806,
        label: "Waste Management"
      }, {
        id: 807,
        label: "Other"
      }]
    }, {
      id:  143,
      label: "Hospitality Industry",
      children: [{
        id: 144,
        label: "Event Planning"
      }, {
        id: 145,
        label: "Food Service"
      }, {
        id: 808,
        label: "Event Venue Rentals"
      }, {
        id: 809,
        label: "Other"
      }]
    }, {
      id:  146,
      label: "Industrial Materials & Equipment",
      children: [{
        id: 147,
        label: "Heavy Machinery"
      }, {
        id: 810,
        label: "Fluid Handling"
      }, {
        id: 811,
        label: "Generators"
      }, {
        id: 812,
        label: "Industrial Handling & Processing Equipment"
      }, {
        id: 813,
        label: "Industrial Measurement & Control Equipment"
      }, {
        id: 814,
        label: "Other"
      }]
    }, {
      id:  148,
      label: "Manufacturing",
      children: [{
        id: 815,
        label: "Factory Automation"
      }, {
        id: 816,
        label: "Other"
      }]
    }, {
      id:  149,
      label: "Metals & Mining",
      children: [{
        id: 150,
        label: "Precious Metals"
      }, {
        id: 817,
        label: "Other"
      }]
    }, {
      id:  151,
      label: "Pharmaceuticals & Biotech"
    }, {
      id:  152,
      label: "Printing & Publishing",
      children: [{
        id: 818,
        label: "Document & Printing Services"
      }, {
        id: 819,
        label: "Other"
      }]
    }, {
      id:  153,
      label: "Retail Trade",
      children: [{
        id: 154,
        label: "Retail Equipment & Technology"
      }, {
        id: 820,
        label: "Other"
      }]
    }, {
      id:  155,
      label: "MLM & Business Opportunities"
    }, {
      id:  156,
      label: "Textiles & Nonwovens"
    }, {
      id:  157,
      label: "Transportation & Logistics",
      children: [{
        id: 158,
        label: "Freight & Trucking"
      }, {
        id: 159,
        label: "Mail & Package Delivery"
      }, {
        id: 160,
        label: "Maritime Transport"
      }, {
        id: 161,
        label: "Moving & Relocation"
      }, {
        id: 162,
        label: "Packaging"
      }, {
        id: 163,
        label: "Parking"
      }, {
        id: 164,
        label: "Rail Transport"
      }, {
        id: 165,
        label: "Urban Transport"
      }]
    }, {
      id:  771,
      label: "Other"
    }, {
      id:  772,
      label: "Brand Management",
      children: [{
        id: 773,
        label: "Marketing"
      }, {
        id: 774,
        label: "Sales"
      }, {
        id: 775,
        label: "Telemarketing"
      }, {
        id: 776,
        label: "Other"
      }]
    }, {
      id:  777,
      label: "Aviation Industry",
      children: [{
        id: 778,
        label: "Other"
      }]
    }, {
      id:  821,
      label: "Other",
      children: [{
        id: 822,
        label: "Import & Export"
      }, {
        id: 823,
        label: "Mail & Package Delivery"
      }, {
        id: 824,
        label: "Moving & Relocation"
      }, {
        id: 825,
        label: "Packaging"
      }, {
        id: 826,
        label: "Self Storage"
      }]
    }, {
      id:  827,
      label: "Business Formation",
      children: [{
        id: 828,
        label: "Home Office"
      }, {
        id: 829,
        label: "Other"
      }]
    }]
  }, {
    id:  166,
    label: "Computers & Electronics",
    children: [{
      id:  167,
      label: "CAD & CAM"
    }, {
      id:  168,
      label: "Computer Hardware",
      children: [{
        id: 169,
        label: "Computer Components"
      }, {
        id: 170,
        label: "Computer Drives & Storage"
      }, {
        id: 171,
        label: "Computer Peripherals"
      }, {
        id: 172,
        label: "Desktop Computers"
      }, {
        id: 173,
        label: "Laptops & Notebooks"
      }, {
        id: 831,
        label: "Computer Servers"
      }, {
        id: 832,
        label: "Hardware Modding & Tuning"
      }, {
        id: 833,
        label: "Other"
      }]
    }, {
      id:  174,
      label: "Computer Security",
      children: [{
        id: 175,
        label: "Hacking & Cracking"
      }, {
        id: 834,
        label: "Antivirus & Malware"
      }, {
        id: 835,
        label: "Network Security"
      }, {
        id: 836,
        label: "Other"
      }]
    }, {
      id:  176,
      label: "Consumer Electronics",
      children: [{
        id: 177,
        label: "Audio Equipment"
      }, {
        id: 178,
        label: "Camera & Photo Equipment"
      }, {
        id: 179,
        label: "Car Electronics"
      }, {
        id: 180,
        label: "Drones & RC Aircraft"
      }, {
        id: 181,
        label: "Game Systems & Consoles"
      }, {
        id: 182,
        label: "GPS & Navigation"
      }, {
        id: 183,
        label: "TV & Video Equipment"
      }, {
        id: 837,
        label: "Electronic Accessories"
      }, {
        id: 838,
        label: "Gadgets & Portable Electronics"
      }, {
        id: 839,
        label: "Home Automation"
      }, {
        id: 840,
        label: "Media Streaming Devices"
      }, {
        id: 841,
        label: "Virtual Reality Devices"
      }, {
        id: 842,
        label: "Other"
      }]
    }, {
      id:  184,
      label: "Electronics & Electrical",
      children: [{
        id: 185,
        label: "Electronic Components"
      }, {
        id: 186,
        label: "Power Supplies"
      }, {
        id: 843,
        label: "Data Sheets & Electronics Reference"
      }, {
        id: 844,
        label: "Electrical Test & Measurement"
      }, {
        id: 845,
        label: "Electromechanical Devices"
      }, {
        id: 846,
        label: "Optoelectronics & Fiber"
      }, {
        id: 847,
        label: "Other"
      }]
    }, {
      id:  187,
      label: "Enterprise Technology",
      children: [{
        id: 188,
        label: "Data Management"
      }, {
        id: 848,
        label: "Customer Relationship Management (CRM)"
      }, {
        id: 849,
        label: "Enterprise Resource Planning (ERP)"
      }, {
        id: 850,
        label: "Helpdesk & Customer Support Systems"
      }, {
        id: 851,
        label: "Other"
      }]
    }, {
      id:  189,
      label: "Networking",
      children: [{
        id: 190,
        label: "Data Formats & Protocols"
      }, {
        id: 191,
        label: "Network Monitoring & Management"
      }, {
        id: 192,
        label: "VPN & Remote Access"
      }, {
        id: 852,
        label: "Distributed & Cloud Computing"
      }, {
        id: 853,
        label: "Networking Equipment"
      }, {
        id: 854,
        label: "Other"
      }]
    }, {
      id:  193,
      label: "Programming",
      children: [{
        id: 194,
        label: "Java (Programming Language)"
      }, {
        id: 855,
        label: "C & C++"
      }, {
        id: 856,
        label: "Development Tools"
      }, {
        id: 857,
        label: "Scripting Languages"
      }, {
        id: 858,
        label: "Windows & .NET"
      }, {
        id: 859,
        label: "Other"
      }]
    }, {
      id:  195,
      label: "Software",
      children: [{
        id: 196,
        label: "Business & Productivity Software"
      }, {
        id: 197,
        label: "Device Drivers"
      }, {
        id: 198,
        label: "Internet Software"
      }, {
        id: 199,
        label: "Multimedia Software"
      }, {
        id: 200,
        label: "Operating Systems"
      }, {
        id: 201,
        label: "Software Utilities"
      }, {
        id: 860,
        label: "Educational Software"
      }, {
        id: 861,
        label: "Freeware & Shareware"
      }, {
        id: 862,
        label: "Intelligent Personal Assistants"
      }, {
        id: 863,
        label: "Monitoring Software"
      }, {
        id: 864,
        label: "Open Source"
      }, {
        id: 865,
        label: "Other"
      }]
    }, {
      id:  830,
      label: "Other"
    }]
  }, {
    id:  202,
    label: "Finance",
    children: [{
      id:  203,
      label: "Accounting & Auditing",
      children: [{
        id: 204,
        label: "Billing & Invoicing"
      }, {
        id: 205,
        label: "Tax Preparation & Planning"
      }, {
        id: 867,
        label: "Bookkeeping"
      }, {
        id: 868,
        label: "Other"
      }]
    }, {
      id:  206,
      label: "Banking",
      children: [{
        id: 869,
        label: "ATMs & Branch Locations"
      }, {
        id: 870,
        label: "Debit & Checking Services"
      }, {
        id: 871,
        label: "Mobile Payments & Digital Wallets"
      }, {
        id: 872,
        label: "Money Transfer & Wire Services"
      }, {
        id: 873,
        label: "Savings Accounts"
      }, {
        id: 874,
        label: "Other"
      }]
    }, {
      id:  207,
      label: "Credit & Lending",
      children: [{
        id: 208,
        label: "Credit Cards"
      }, {
        id: 209,
        label: "Credit Reporting & Monitoring"
      }, {
        id: 210,
        label: "Loans"
      }, {
        id: 875,
        label: "Debt Collection & Repossession"
      }, {
        id: 876,
        label: "Debt Management"
      }, {
        id: 877,
        label: "Other"
      }]
    }, {
      id:  211,
      label: "Financial Planning & Management",
      children: [{
        id: 212,
        label: "Retirement & Pension"
      }, {
        id: 879,
        label: "Asset & Portfolio Management"
      }, {
        id: 880,
        label: "Inheritance & Estate Planning"
      }, {
        id: 881,
        label: "Other"
      }]
    }, {
      id:  213,
      label: "Grants, Scholarships & Financial Aid",
      children: [{
        id: 214,
        label: "Study Grants & Scholarships"
      }, {
        id: 882,
        label: "Government Grants"
      }, {
        id: 883,
        label: "Other"
      }]
    }, {
      id:  215,
      label: "Insurance",
      children: [{
        id: 216,
        label: "Health Insurance"
      }, {
        id: 884,
        label: "Home Insurance"
      }, {
        id: 885,
        label: "Life Insurance"
      }, {
        id: 886,
        label: "Travel Insurance"
      }, {
        id: 887,
        label: "Vehicle Insurance"
      }, {
        id: 888,
        label: "Other"
      }]
    }, {
      id:  217,
      label: "Investing",
      children: [{
        id: 218,
        label: "Commodities & Futures Trading"
      }, {
        id: 219,
        label: "Currencies & Foreign Exchange"
      }, {
        id: 220,
        label: "Stocks & Bonds"
      }, {
        id: 889,
        label: "Brokerages & Day Trading"
      }, {
        id: 890,
        label: "Derivatives"
      }, {
        id: 891,
        label: "Funds"
      }, {
        id: 892,
        label: "Real Estate Investment Trusts"
      }, {
        id: 893,
        label: "Socially Responsible Investing"
      }, {
        id: 894,
        label: "Other"
      }]
    }, {
      id:  866,
      label: "Other"
    }, {
      id:  878,
      label: "Crowdfunding"
    }]
  }, {
    id:  221,
    label: "Food & Drink",
    children: [{
      id:  222,
      label: "Beverages",
      children: [{
        id: 223,
        label: "Alcoholic Beverages"
      }, {
        id: 224,
        label: "Coffee & Tea"
      }, {
        id: 225,
        label: "Juice"
      }, {
        id: 226,
        label: "Soft Drinks"
      }, {
        id: 896,
        label: "Alcohol-Free Beverages"
      }, {
        id: 897,
        label: "Bottled Water"
      }, {
        id: 898,
        label: "Energy Drinks"
      }, {
        id: 899,
        label: "Nutrition Drinks & Shakes"
      }, {
        id: 900,
        label: "Sports Drinks"
      }, {
        id: 901,
        label: "Other"
      }]
    }, {
      id:  227,
      label: "Cooking & Recipes",
      children: [{
        id: 228,
        label: "BBQ & Grilling"
      }, {
        id: 229,
        label: "Desserts"
      }, {
        id: 230,
        label: "Soups & Stews"
      }, {
        id: 902,
        label: "Cuisines"
      }, {
        id: 903,
        label: "Culinary Training"
      }, {
        id: 904,
        label: "Healthy Eating"
      }, {
        id: 905,
        label: "Salads"
      }, {
        id: 906,
        label: "Other"
      }]
    }, {
      id:  231,
      label: "Food",
      children: [{
        id: 233,
        label: "Baked Goods"
      }, {
        id: 234,
        label: "Breakfast Foods"
      }, {
        id: 235,
        label: "Candy & Sweets"
      }, {
        id: 236,
        label: "Grains & Pasta"
      }, {
        id: 237,
        label: "Meat & Seafood"
      }, {
        id: 238,
        label: "Snack Foods"
      }, {
        id: 907,
        label: "Other"
      }, {
        id: 918,
        label: "Condiments & Dressings"
      }, {
        id: 919,
        label: "Cooking Fats & Oils"
      }, {
        id: 920,
        label: "Dairy & Egg Substitutes"
      }, {
        id: 921,
        label: "Dairy & Eggs"
      }, {
        id: 922,
        label: "Fruits & Vegetables"
      }, {
        id: 923,
        label: "Gourmet & Specialty Foods"
      }, {
        id: 924,
        label: "Herbs & Spices"
      }, {
        id: 925,
        label: "Jams, Jellies & Preserves"
      }, {
        id: 926,
        label: "Meat & Seafood Substitutes"
      }, {
        id: 927,
        label: "Organic & Natural Foods"
      }]
    }, {
      id:  232,
      label: "Food & Grocery Retailers",
      children: [{
        id: 912,
        label: "Bakeries"
      }, {
        id: 913,
        label: "Butchers"
      }, {
        id: 914,
        label: "Convenience Stores"
      }, {
        id: 915,
        label: "Delicatessens"
      }, {
        id: 916,
        label: "Farmers' Markets"
      }, {
        id: 917,
        label: "Other"
      }]
    }, {
      id:  239,
      label: "Restaurants",
      children: [{
        id: 240,
        label: "Fast Food"
      }, {
        id: 241,
        label: "Pizzerias"
      }, {
        id: 242,
        label: "Restaurant Reviews & Reservations"
      }, {
        id: 928,
        label: "Catering"
      }, {
        id: 929,
        label: "Fine Dining"
      }, {
        id: 930,
        label: "Other"
      }]
    }, {
      id:  895,
      label: "Other"
    }, {
      id:  908,
      label: "Grocery Delivery Services",
      children: [{
        id: 909,
        label: "Meal Kits"
      }, {
        id: 910,
        label: "Restaurant Delivery Services"
      }, {
        id: 911,
        label: "Other"
      }]
    }]
  }, {
    id:  243,
    label: "Games",
    children: [{
      id:  244,
      label: "Arcade & Coin-Op Games"
    }, {
      id:  245,
      label: "Board Games",
      children: [{
        id: 246,
        label: "Chess & Abstract Strategy Games"
      }, {
        id: 247,
        label: "Miniatures & Wargaming"
      }, {
        id: 932,
        label: "Other"
      }]
    }, {
      id:  248,
      label: "Card Games",
      children: [{
        id: 249,
        label: "Collectible Card Games"
      }, {
        id: 250,
        label: "Poker & Casino Games"
      }, {
        id: 933,
        label: "Other"
      }]
    }, {
      id:  251,
      label: "Computer & Video Games",
      children: [{
        id: 252,
        label: "Casual Games"
      }, {
        id: 253,
        label: "Driving & Racing Games"
      }, {
        id: 254,
        label: "Fighting Games"
      }, {
        id: 255,
        label: "Music & Dance Games"
      }, {
        id: 256,
        label: "Sandbox Games"
      }, {
        id: 257,
        label: "Shooter Games"
      }, {
        id: 258,
        label: "Simulation Games"
      }, {
        id: 259,
        label: "Sports Games"
      }, {
        id: 260,
        label: "Strategy Games"
      }, {
        id: 261,
        label: "Video Game Emulation"
      }, {
        id: 934,
        label: "Action & Platform Games"
      }, {
        id: 935,
        label: "Adventure Games"
      }, {
        id: 936,
        label: "Browser Games"
      }, {
        id: 937,
        label: "Competitive Video Gaming"
      }, {
        id: 938,
        label: "Gaming Reference & Reviews"
      }, {
        id: 939,
        label: "Massively Multiplayer Games"
      }, {
        id: 940,
        label: "Video Game Development"
      }, {
        id: 941,
        label: "Video Game Mods & Add-Ons"
      }, {
        id: 942,
        label: "Video Game Retailers"
      }, {
        id: 943,
        label: "Other"
      }]
    }, {
      id:  262,
      label: "Family-Oriented Games & Activities",
      children: [{
        id: 263,
        label: "Drawing & Coloring"
      }, {
        id: 264,
        label: "Dress-Up & Fashion Games"
      }, {
        id: 946,
        label: "Other"
      }]
    }, {
      id:  265,
      label: "Gambling",
      children: [{
        id: 266,
        label: "Lottery"
      }, {
        id: 947,
        label: "Sports Betting"
      }, {
        id: 948,
        label: "Other"
      }]
    }, {
      id:  267,
      label: "Massively Multiplayer Games"
    }, {
      id:  268,
      label: "Puzzles & Brainteasers"
    }, {
      id:  269,
      label: "Roleplaying Games"
    }, {
      id:  270,
      label: "Table Games",
      children: [{
        id: 271,
        label: "Billiards"
      }, {
        id: 950,
        label: "Table Tennis"
      }, {
        id: 951,
        label: "Other"
      }]
    }, {
      id:  272,
      label: "Word Games"
    }, {
      id:  931,
      label: "Other"
    }, {
      id:  944,
      label: "Dice Games"
    }, {
      id:  945,
      label: "Educational Games"
    }, {
      id:  949,
      label: "Party Games"
    }, {
      id:  952,
      label: "Tile Games"
    }]
  }, {
    id:  273,
    label: "Health",
    children: [{
      id:  274,
      label: "Aging & Geriatrics",
      children: [{
        id: 954,
        label: "Alzheimer's Disease"
      }, {
        id: 955,
        label: "Other"
      }]
    }, {
      id:  275,
      label: "Health Conditions",
      children: [{
        id: 276,
        label: "AIDS & HIV"
      }, {
        id: 277,
        label: "Allergies"
      }, {
        id: 278,
        label: "Arthritis"
      }, {
        id: 279,
        label: "Cancer"
      }, {
        id: 280,
        label: "Diabetes"
      }, {
        id: 281,
        label: "Ear Nose & Throat"
      }, {
        id: 282,
        label: "Eating Disorders"
      }, {
        id: 283,
        label: "Endocrine Conditions"
      }, {
        id: 284,
        label: "Genetic Disorders"
      }, {
        id: 285,
        label: "Heart & Hypertension"
      }, {
        id: 286,
        label: "Infectious Diseases"
      }, {
        id: 287,
        label: "Neurological Conditions"
      }, {
        id: 288,
        label: "Obesity"
      }, {
        id: 289,
        label: "Pain Management"
      }, {
        id: 290,
        label: "Respiratory Conditions"
      }, {
        id: 291,
        label: "Skin Conditions"
      }, {
        id: 292,
        label: "Sleep Disorders"
      }, {
        id: 959,
        label: "Other"
      }, {
        id: 960,
        label: "Blood Sugar & Diabetes"
      }, {
        id: 961,
        label: "GERD & Digestive Disorders"
      }, {
        id: 962,
        label: "Injury"
      }]
    }, {
      id:  293,
      label: "Health Education & Medical Training"
    }, {
      id:  294,
      label: "Health Foundations & Medical Research"
    }, {
      id:  295,
      label: "Medical Devices & Equipment",
      children: [{
        id: 963,
        label: "Assistive Technology"
      }, {
        id: 964,
        label: "Other"
      }]
    }, {
      id:  296,
      label: "Medical Facilities & Services",
      children: [{
        id: 297,
        label: "Doctors' Offices"
      }, {
        id: 298,
        label: "Hospitals & Treatment Centers"
      }, {
        id: 299,
        label: "Medical Procedures"
      }, {
        id: 300,
        label: "Physical Therapy"
      }, {
        id: 965,
        label: "Other"
      }]
    }, {
      id:  301,
      label: "Men's Health"
    }, {
      id:  302,
      label: "Mental Health",
      children: [{
        id: 303,
        label: "Anxiety & Stress"
      }, {
        id: 304,
        label: "Depression"
      }, {
        id: 968,
        label: "Compulsive Gambling"
      }, {
        id: 969,
        label: "Counseling Services"
      }, {
        id: 970,
        label: "Other"
      }]
    }, {
      id:  305,
      label: "Nursing",
      children: [{
        id: 306,
        label: "Assisted Living & Long Term Care"
      }, {
        id: 971,
        label: "Other"
      }]
    }, {
      id:  307,
      label: "Nutrition",
      children: [{
        id: 308,
        label: "Special & Restricted Diets"
      }, {
        id: 309,
        label: "Vitamins & Supplements"
      }, {
        id: 972,
        label: "Other"
      }]
    }, {
      id:  310,
      label: "Oral & Dental Care"
    }, {
      id:  311,
      label: "Pharmacy",
      children: [{
        id: 312,
        label: "Drugs & Medications"
      }, {
        id: 974,
        label: "Other"
      }]
    }, {
      id:  313,
      label: "Public Health",
      children: [{
        id: 314,
        label: "Occupational Health & Safety"
      }, {
        id: 975,
        label: "Health Policy"
      }, {
        id: 976,
        label: "Toxic Substances & Poisoning"
      }, {
        id: 977,
        label: "Other"
      }]
    }, {
      id:  315,
      label: "Reproductive Health",
      children: [{
        id: 978,
        label: "Birth Control"
      }, {
        id: 979,
        label: "Infertility"
      }, {
        id: 980,
        label: "Male Impotence"
      }, {
        id: 981,
        label: "OBGYN"
      }, {
        id: 982,
        label: "Sex Education & Counseling"
      }, {
        id: 983,
        label: "Other"
      }]
    }, {
      id:  316,
      label: "Substance Abuse",
      children: [{
        id: 317,
        label: "Drug & Alcohol Testing"
      }, {
        id: 318,
        label: "Drug & Alcohol Treatment"
      }, {
        id: 319,
        label: "Smoking & Smoking Cessation"
      }, {
        id: 320,
        label: "Steroids & Performance-Enhancing Drugs"
      }, {
        id: 984,
        label: "Other"
      }]
    }, {
      id:  321,
      label: "Vision Care",
      children: [{
        id: 322,
        label: "Eyeglasses & Contacts"
      }, {
        id: 985,
        label: "Eye Exams & Optometry"
      }, {
        id: 986,
        label: "Laser Vision Correction"
      }, {
        id: 987,
        label: "Other"
      }]
    }, {
      id:  323,
      label: "Women's Health"
    }, {
      id:  953,
      label: "Other"
    }, {
      id:  956,
      label: "Acupuncture & Chinese Medicine",
      children: [{
        id: 957,
        label: "Cleansing & Detoxification"
      }, {
        id: 958,
        label: "Other"
      }]
    }, {
      id:  966,
      label: "Medical Photos & Illustration",
      children: [{
        id: 967,
        label: "Other"
      }]
    }, {
      id:  973,
      label: "Pediatrics"
    }]
  }, {
    id:  324,
    label: "Hobbies & Leisure",
    children: [{
      id:  325,
      label: "Clubs & Organizations",
      children: [{
        id: 326,
        label: "Youth Organizations & Resources"
      }, {
        id: 989,
        label: "Other"
      }]
    }, {
      id:  327,
      label: "Crafts",
      children: [{
        id: 328,
        label: "Fiber & Textile Arts"
      }, {
        id: 990,
        label: "Art & Craft Supplies"
      }, {
        id: 991,
        label: "Ceramics & Pottery"
      }, {
        id: 992,
        label: "Other"
      }]
    }, {
      id:  329,
      label: "Merit Prizes & Contests"
    }, {
      id:  330,
      label: "Outdoors",
      children: [{
        id: 331,
        label: "Fishing"
      }, {
        id: 332,
        label: "Hiking & Camping"
      }, {
        id: 993,
        label: "Hunting & Shooting"
      }, {
        id: 994,
        label: "Other"
      }]
    }, {
      id:  333,
      label: "Paintball"
    }, {
      id:  334,
      label: "Radio Control & Modeling",
      children: [{
        id: 335,
        label: "Model Trains & Railroads"
      }, {
        id: 995,
        label: "Other"
      }]
    }, {
      id:  336,
      label: "Special Occasions",
      children: [{
        id: 337,
        label: "Holidays & Seasonal Events"
      }, {
        id: 338,
        label: "Weddings"
      }, {
        id: 997,
        label: "Anniversaries"
      }, {
        id: 998,
        label: "Other"
      }]
    }, {
      id:  339,
      label: "Water Activities",
      children: [{
        id: 340,
        label: "Boating"
      }, {
        id: 341,
        label: "Surf & Swim"
      }, {
        id: 1000,
        label: "Diving & Underwater Activities"
      }, {
        id: 1001,
        label: "Other"
      }]
    }, {
      id:  988,
      label: "Other"
    }, {
      id:  996,
      label: "Recreational Aviation"
    }, {
      id:  999,
      label: "Sweepstakes & Promotional Giveaways"
    }]
  }, {
    id:  342,
    label: "Home & Garden",
    children: [{
      id:  343,
      label: "Bed & Bath",
      children: [{
        id: 344,
        label: "Bathroom"
      }, {
        id: 1003,
        label: "Bedroom"
      }, {
        id: 1004,
        label: "Other"
      }]
    }, {
      id:  345,
      label: "Domestic Services",
      children: [{
        id: 346,
        label: "Cleaning Services"
      }, {
        id: 1005,
        label: "Other"
      }]
    }, {
      id:  347,
      label: "Gardening & Landscaping"
    }, {
      id:  348,
      label: "Home & Interior Decor"
    }, {
      id:  349,
      label: "Home Appliances",
      children: [{
        id: 1006,
        label: "Vacuums & Floor Care"
      }, {
        id: 1007,
        label: "Water Filters & Purifiers"
      }, {
        id: 1008,
        label: "Other"
      }]
    }, {
      id:  350,
      label: "Home Furnishings",
      children: [{
        id: 351,
        label: "Curtains & Window Treatments"
      }, {
        id: 352,
        label: "Kitchen & Dining Furniture"
      }, {
        id: 353,
        label: "Lamps & Lighting"
      }, {
        id: 354,
        label: "Living Room Furniture"
      }, {
        id: 355,
        label: "Rugs & Carpets"
      }, {
        id: 1009,
        label: "Clocks"
      }, {
        id: 1010,
        label: "Countertops"
      }, {
        id: 1011,
        label: "Outdoor Furniture"
      }, {
        id: 1012,
        label: "Other"
      }]
    }, {
      id:  356,
      label: "Home Improvement",
      children: [{
        id: 357,
        label: "Construction & Power Tools"
      }, {
        id: 358,
        label: "Doors & Windows"
      }, {
        id: 359,
        label: "Flooring"
      }, {
        id: 360,
        label: "House Painting & Finishing"
      }, {
        id: 361,
        label: "Plumbing"
      }, {
        id: 1013,
        label: "Locks & Locksmiths"
      }, {
        id: 1014,
        label: "Roofing"
      }, {
        id: 1015,
        label: "Other"
      }]
    }, {
      id:  362,
      label: "Home Safety & Security",
      children: [{
        id: 1016,
        label: "Home Alarm & Security Systems"
      }, {
        id: 1017,
        label: "Other"
      }]
    }, {
      id:  363,
      label: "Home Storage & Shelving",
      children: [{
        id: 1018,
        label: "Cabinetry"
      }, {
        id: 1019,
        label: "Other"
      }]
    }, {
      id:  364,
      label: "Home Swimming Pools, Saunas & Spas"
    }, {
      id:  365,
      label: "HVAC & Climate Control",
      children: [{
        id: 366,
        label: "Fireplaces & Stoves"
      }, {
        id: 1023,
        label: "Air Conditioners"
      }, {
        id: 1024,
        label: "Air Filters & Purifiers"
      }, {
        id: 1025,
        label: "Heaters"
      }, {
        id: 1026,
        label: "Household Fans"
      }, {
        id: 1027,
        label: "Other"
      }]
    }, {
      id:  367,
      label: "Kitchen & Dining",
      children: [{
        id: 368,
        label: "Cookware & Diningware"
      }, {
        id: 369,
        label: "Major Kitchen Appliances"
      }, {
        id: 370,
        label: "Small Kitchen Appliances"
      }, {
        id: 1028,
        label: "Other"
      }]
    }, {
      id:  371,
      label: "Laundry",
      children: [{
        id: 372,
        label: "Washers & Dryers"
      }, {
        id: 1029,
        label: "Other"
      }]
    }, {
      id:  373,
      label: "Nursery & Playroom"
    }, {
      id:  374,
      label: "Pest Control"
    }, {
      id:  375,
      label: "Yard & Patio",
      children: [{
        id: 376,
        label: "Lawn Mowers"
      }]
    }, {
      id:  1002,
      label: "Other"
    }, {
      id:  1020,
      label: "Household Batteries",
      children: [{
        id: 1021,
        label: "Household Cleaning Supplies"
      }, {
        id: 1022,
        label: "Other"
      }]
    }, {
      id:  1030,
      label: "Barbecues & Grills",
      children: [{
        id: 1031,
        label: "Garden Structures"
      }, {
        id: 1032,
        label: "Gardening"
      }, {
        id: 1033,
        label: "Landscape Design"
      }, {
        id: 1034,
        label: "Other"
      }]
    }]
  }, {
    id:  377,
    label: "Internet & Telecom",
    children: [{
      id:  378,
      label: "Communications Equipment",
      children: [{
        id: 379,
        label: "Radio Equipment"
      }, {
        id: 1036,
        label: "Other"
      }]
    }, {
      id:  380,
      label: "Email & Messaging",
      children: [{
        id: 381,
        label: "Text & Instant Messaging"
      }, {
        id: 382,
        label: "Voice & Video Chat"
      }, {
        id: 1037,
        label: "Electronic Spam"
      }, {
        id: 1038,
        label: "Email"
      }, {
        id: 1039,
        label: "Other"
      }]
    }, {
      id:  383,
      label: "Mobile & Wireless",
      children: [{
        id: 384,
        label: "Mobile & Wireless Accessories"
      }, {
        id: 385,
        label: "Mobile Apps & Add-Ons"
      }, {
        id: 386,
        label: "Mobile Phones"
      }, {
        id: 1040,
        label: "Other"
      }]
    }, {
      id:  387,
      label: "Service Providers",
      children: [{
        id: 388,
        label: "Cable & Satellite Providers"
      }, {
        id: 1043,
        label: "ISPs"
      }, {
        id: 1044,
        label: "Phone Service Providers"
      }, {
        id: 1045,
        label: "Other"
      }]
    }, {
      id:  389,
      label: "Web Services",
      children: [{
        id: 390,
        label: "Affiliate Programs"
      }, {
        id: 391,
        label: "Web Design & Development"
      }, {
        id: 1047,
        label: "Cloud Storage"
      }, {
        id: 1048,
        label: "Search Engine Optimization & Marketing"
      }, {
        id: 1049,
        label: "Web Stats & Analytics"
      }, {
        id: 1050,
        label: "Other"
      }]
    }, {
      id:  1035,
      label: "Other"
    }, {
      id:  1041,
      label: "People Search",
      children: [{
        id: 1042,
        label: "Other"
      }]
    }, {
      id:  1046,
      label: "Teleconferencing"
    }]
  }, {
    id:  392,
    label: "Jobs & Education",
    children: [{
      id:  393,
      label: "Education",
      children: [{
        id: 394,
        label: "Colleges & Universities"
      }, {
        id: 395,
        label: "Distance Learning"
      }, {
        id: 396,
        label: "Homeschooling"
      }, {
        id: 397,
        label: "Primary & Secondary Schooling (K-12)"
      }, {
        id: 398,
        label: "Standardized & Admissions Tests"
      }, {
        id: 399,
        label: "Teaching & Classroom Resources"
      }, {
        id: 400,
        label: "Training & Certification"
      }, {
        id: 401,
        label: "Vocational & Continuing Education"
      }, {
        id: 1052,
        label: "Academic Conferences & Publications"
      }, {
        id: 1053,
        label: "Alumni & Reunions"
      }, {
        id: 1054,
        label: "Computer Education"
      }, {
        id: 1055,
        label: "Early Childhood Education"
      }, {
        id: 1056,
        label: "Open Online Courses"
      }, {
        id: 1057,
        label: "Private Tutoring Services"
      }, {
        id: 1058,
        label: "Special Education"
      }, {
        id: 1059,
        label: "Study Abroad"
      }, {
        id: 1060,
        label: "Other"
      }]
    }, {
      id:  402,
      label: "Jobs",
      children: [{
        id: 403,
        label: "Career Resources & Planning"
      }, {
        id: 404,
        label: "Job Listings"
      }, {
        id: 405,
        label: "Resumes & Portfolios"
      }, {
        id: 1062,
        label: "Other"
      }]
    }, {
      id:  1051,
      label: "Other"
    }, {
      id:  1061,
      label: "Internships"
    }]
  }, {
    id:  406,
    label: "Law & Government",
    children: [{
      id:  407,
      label: "Government",
      children: [{
        id: 408,
        label: "Courts & Judiciary"
      }, {
        id: 409,
        label: "Visa & Immigration"
      }, {
        id: 1064,
        label: "Embassies & Consulates"
      }, {
        id: 1065,
        label: "Executive Branch"
      }, {
        id: 1066,
        label: "Government Contracting & Procurement"
      }, {
        id: 1067,
        label: "Intelligence & Counterterrorism"
      }, {
        id: 1068,
        label: "Legislative Branch"
      }, {
        id: 1069,
        label: "Lobbying"
      }, {
        id: 1070,
        label: "Public Policy"
      }, {
        id: 1071,
        label: "Royalty"
      }, {
        id: 1072,
        label: "Other"
      }]
    }, {
      id:  410,
      label: "Legal",
      children: [{
        id: 411,
        label: "Bankruptcy"
      }, {
        id: 412,
        label: "Legal Education"
      }, {
        id: 413,
        label: "Legal Services"
      }, {
        id: 1073,
        label: "Accident & Personal Injury Law"
      }, {
        id: 1074,
        label: "Business & Corporate Law"
      }, {
        id: 1075,
        label: "Constitutional Law & Civil Rights"
      }, {
        id: 1076,
        label: "Family Law"
      }, {
        id: 1077,
        label: "Intellectual Property"
      }, {
        id: 1078,
        label: "Labor & Employment Law"
      }, {
        id: 1079,
        label: "Product Liability"
      }, {
        id: 1080,
        label: "Real Estate Law"
      }, {
        id: 1081,
        label: "Other"
      }]
    }, {
      id:  414,
      label: "Military",
      children: [{
        id: 1082,
        label: "Air Force"
      }, {
        id: 1083,
        label: "Army"
      }, {
        id: 1084,
        label: "Marines"
      }, {
        id: 1085,
        label: "Navy"
      }, {
        id: 1086,
        label: "Veterans"
      }, {
        id: 1087,
        label: "Other"
      }]
    }, {
      id:  415,
      label: "Public Safety",
      children: [{
        id: 416,
        label: "Crime & Justice"
      }, {
        id: 417,
        label: "Emergency Services"
      }, {
        id: 418,
        label: "Law Enforcement"
      }, {
        id: 419,
        label: "Security Products & Services"
      }, {
        id: 1088,
        label: "Other"
      }]
    }, {
      id:  420,
      label: "Social Services",
      children: [{
        id: 1089,
        label: "Welfare & Unemployment"
      }, {
        id: 1090,
        label: "Other"
      }]
    }, {
      id:  1063,
      label: "Other"
    }]
  }, {
    id:  421,
    label: "News",
    children: [{
      id:  422,
      label: "Business News",
      children: [{
        id: 423,
        label: "Company News"
      }, {
        id: 424,
        label: "Financial Markets News"
      }, {
        id: 1092,
        label: "Economy News"
      }, {
        id: 1093,
        label: "Fiscal Policy News"
      }, {
        id: 1094,
        label: "Other"
      }]
    }, {
      id:  425,
      label: "Scandals & Investigations"
    }, {
      id:  426,
      label: "Health News"
    }, {
      id:  427,
      label: "Politics",
      children: [{
        id: 1097,
        label: "Campaigns & Elections"
      }, {
        id: 1098,
        label: "Media Critics & Watchdogs"
      }, {
        id: 1099,
        label: "Political Polls & Surveys"
      }, {
        id: 1100,
        label: "Other"
      }]
    }, {
      id:  428,
      label: "Sports News"
    }, {
      id:  429,
      label: "Weather"
    }, {
      id:  1091,
      label: "Other"
    }, {
      id:  1095,
      label: "Other"
    }, {
      id:  1096,
      label: "Local News"
    }, {
      id:  1101,
      label: "Technology News"
    }, {
      id:  1102,
      label: "World News"
    }]
  }, {
    id:  430,
    label: "Online Communities",
    children: [{
      id:  431,
      label: "Blogging Resources & Services"
    }, {
      id:  432,
      label: "Dating & Personals",
      children: [{
        id: 433,
        label: "Matrimonial Services"
      }, {
        id: 434,
        label: "Personals"
      }, {
        id: 435,
        label: "Photo Rating Sites"
      }, {
        id: 1104,
        label: "Other"
      }]
    }, {
      id:  436,
      label: "File Sharing & Hosting"
    }, {
      id:  437,
      label: "Online Goodies",
      children: [{
        id: 438,
        label: "Clip Art & Animated GIFs"
      }, {
        id: 439,
        label: "Skins, Themes & Wallpapers"
      }, {
        id: 440,
        label: "Social Network Apps & Add-Ons"
      }, {
        id: 1105,
        label: "Other"
      }]
    }, {
      id:  441,
      label: "Photo & Video Sharing",
      children: [{
        id: 442,
        label: "Photo & Image Sharing"
      }, {
        id: 1107,
        label: "Video Sharing"
      }, {
        id: 1108,
        label: "Other"
      }]
    }, {
      id:  443,
      label: "Social Networks"
    }, {
      id:  444,
      label: "Virtual Worlds"
    }, {
      id:  1103,
      label: "Other"
    }, {
      id:  1106,
      label: "Online Journals & Personal Sites"
    }]
  }, {
    id:  445,
    label: "People & Society",
    children: [{
      id:  446,
      label: "Family & Relationships",
      children: [{
        id: 447,
        label: "Family"
      }, {
        id: 448,
        label: "Marriage"
      }, {
        id: 449,
        label: "Troubled Relationships"
      }, {
        id: 1110,
        label: "Etiquette"
      }, {
        id: 1111,
        label: "Other"
      }, {
        id: 1112,
        label: "Romance"
      }]
    }, {
      id:  450,
      label: "Kids & Teens",
      children: [{
        id: 451,
        label: "Children's Interests"
      }, {
        id: 452,
        label: "Teen Interests"
      }, {
        id: 1113,
        label: "Other"
      }]
    }, {
      id:  453,
      label: "Religion & Belief"
    }, {
      id:  454,
      label: "Seniors & Retirement"
    }, {
      id:  455,
      label: "Social Issues & Advocacy",
      children: [{
        id: 456,
        label: "Charity & Philanthropy"
      }, {
        id: 457,
        label: "Discrimination & Identity Relations"
      }, {
        id: 458,
        label: "Green Living & Environmental Issues"
      }, {
        id: 459,
        label: "Human Rights & Liberties"
      }, {
        id: 460,
        label: "Poverty & Hunger"
      }, {
        id: 461,
        label: "Work & Labor Issues"
      }, {
        id: 1115,
        label: "Drug Laws & Policy"
      }, {
        id: 1116,
        label: "Ethics"
      }, {
        id: 1117,
        label: "Housing & Development"
      }, {
        id: 1118,
        label: "Other"
      }]
    }, {
      id:  462,
      label: "Social Sciences",
      children: [{
        id: 463,
        label: "Economics"
      }, {
        id: 464,
        label: "Political Science"
      }, {
        id: 465,
        label: "Psychology"
      }, {
        id: 1119,
        label: "Anthropology"
      }, {
        id: 1120,
        label: "Archaeology"
      }, {
        id: 1121,
        label: "Communications & Media Studies"
      }, {
        id: 1122,
        label: "Demographics"
      }, {
        id: 1123,
        label: "Other"
      }]
    }, {
      id:  466,
      label: "Subcultures & Niche Interests"
    }, {
      id:  1109,
      label: "Other"
    }, {
      id:  1114,
      label: "Self-Help & Motivational"
    }]
  }, {
    id:  467,
    label: "Pets & Animals",
    children: [{
      id:  468,
      label: "Pet Food & Supplies"
    }, {
      id:  469,
      label: "Veterinarians"
    }, {
      id:  470,
      label: "Pets",
      children: [{
        id: 471,
        label: "Birds"
      }, {
        id: 472,
        label: "Cats"
      }, {
        id: 473,
        label: "Dogs"
      }, {
        id: 474,
        label: "Exotic Pets"
      }, {
        id: 475,
        label: "Fish & Aquaria"
      }, {
        id: 476,
        label: "Horses"
      }, {
        id: 477,
        label: "Rabbits & Rodents"
      }, {
        id: 478,
        label: "Reptiles & Amphibians"
      }, {
        id: 1128,
        label: "Other"
      }]
    }, {
      id:  479,
      label: "Wildlife"
    }, {
      id:  1124,
      label: "Other"
    }, {
      id:  1125,
      label: "Animal Welfare",
      children: [{
        id: 1126,
        label: "Pet Food & Pet Care Supplies"
      }, {
        id: 1127,
        label: "Other"
      }]
    }]
  }, {
    id:  480,
    label: "Real Estate",
    children: [{
      id:  481,
      label: "Real Estate Listings",
      children: [{
        id: 482,
        label: "Bank-Owned & Foreclosed Properties"
      }, {
        id: 483,
        label: "Commercial Properties"
      }, {
        id: 484,
        label: "Lots & Land"
      }, {
        id: 485,
        label: "Residential Rentals"
      }, {
        id: 486,
        label: "Residential Sales"
      }, {
        id: 487,
        label: "Timeshares & Vacation Properties"
      }, {
        id: 1131,
        label: "Other"
      }]
    }, {
      id:  488,
      label: "Real Estate Services",
      children: [{
        id: 1132,
        label: "Property Inspections & Appraisals"
      }, {
        id: 1133,
        label: "Property Management"
      }, {
        id: 1134,
        label: "Real Estate Agencies"
      }, {
        id: 1135,
        label: "Real Estate Title & Escrow"
      }, {
        id: 1136,
        label: "Other"
      }]
    }, {
      id:  1129,
      label: "Property Development"
    }, {
      id:  1130,
      label: "Other"
    }]
  }, {
    id:  489,
    label: "Reference",
    children: [{
      id:  490,
      label: "Directories & Listings",
      children: [{
        id: 491,
        label: "Business & Personal Listings"
      }, {
        id: 1138,
        label: "Other"
      }]
    }, {
      id:  492,
      label: "General Reference",
      children: [{
        id: 493,
        label: "Biographies & Quotations"
      }, {
        id: 494,
        label: "Calculators & Reference Tools"
      }, {
        id: 495,
        label: "Dictionaries & Encyclopedias"
      }, {
        id: 496,
        label: "Forms Guides & Templates"
      }, {
        id: 497,
        label: "Public Records"
      }, {
        id: 498,
        label: "Time & Calendars"
      }, {
        id: 1139,
        label: "Educational Resources"
      }, {
        id: 1140,
        label: "How-To, DIY & Expert Content"
      }, {
        id: 1141,
        label: "Other"
      }]
    }, {
      id:  499,
      label: "Geographic Reference",
      children: [{
        id: 500,
        label: "Maps"
      }, {
        id: 1142,
        label: "Other"
      }]
    }, {
      id:  501,
      label: "Humanities",
      children: [{
        id: 502,
        label: "History"
      }, {
        id: 503,
        label: "Myth & Folklore"
      }, {
        id: 504,
        label: "Philosophy"
      }, {
        id: 1143,
        label: "Other"
      }]
    }, {
      id:  505,
      label: "Language Resources",
      children: [{
        id: 506,
        label: "Foreign Language Resources"
      }, {
        id: 1144,
        label: "Other"
      }]
    }, {
      id:  507,
      label: "Libraries & Museums",
      children: [{
        id: 508,
        label: "Museums"
      }, {
        id: 1145,
        label: "Libraries"
      }, {
        id: 1146,
        label: "Other"
      }]
    }, {
      id:  1137,
      label: "Other"
    }, {
      id:  1147,
      label: "Technical Reference"
    }]
  }, {
    id:  509,
    label: "Science",
    children: [{
      id:  510,
      label: "Astronomy"
    }, {
      id:  511,
      label: "Biological Sciences",
      children: [{
        id: 512,
        label: "Neuroscience"
      }, {
        id: 1149,
        label: "Genetics"
      }, {
        id: 1150,
        label: "Other"
      }]
    }, {
      id:  513,
      label: "Chemistry"
    }, {
      id:  514,
      label: "Computer Science",
      children: [{
        id: 1151,
        label: "Machine Learning & Artificial Intelligence"
      }, {
        id: 1152,
        label: "Other"
      }]
    }, {
      id:  515,
      label: "Earth Sciences",
      children: [{
        id: 516,
        label: "Atmospheric Science"
      }, {
        id: 517,
        label: "Geology"
      }, {
        id: 1153,
        label: "Paleontology"
      }, {
        id: 1154,
        label: "Other"
      }]
    }, {
      id:  518,
      label: "Ecology & Environment",
      children: [{
        id: 519,
        label: "Climate Change & Global Warming"
      }, {
        id: 1155,
        label: "Other"
      }]
    }, {
      id:  520,
      label: "Engineering & Technology",
      children: [{
        id: 521,
        label: "Robotics"
      }, {
        id: 1156,
        label: "Augmented & Virtual Reality"
      }, {
        id: 1157,
        label: "Other"
      }]
    }, {
      id:  522,
      label: "Mathematics",
      children: [{
        id: 523,
        label: "Statistics"
      }, {
        id: 1158,
        label: "Other"
      }]
    }, {
      id:  524,
      label: "Physics"
    }, {
      id:  525,
      label: "Scientific Institutions"
    }, {
      id:  1148,
      label: "Other"
    }, {
      id:  1159,
      label: "Scientific Equipment"
    }]
  }, {
    id:  526,
    label: "Sensitive Subjects",
    children: [{
      id:  1160,
      label: "Accidents & Disasters"
    }, {
      id:  1161,
      label: "Death & Tragedy"
    }, {
      id:  1162,
      label: "Firearms & Weapons"
    }, {
      id:  1163,
      label: "Recreational Drugs"
    }, {
      id:  1164,
      label: "Self-Harm"
    }, {
      id:  1165,
      label: "Violence & Abuse"
    }, {
      id:  1166,
      label: "War & Conflict"
    }, {
      id:  1167,
      label: "Other"
    }]
  }, {
    id:  527,
    label: "Shopping",
    children: [{
      id:  528,
      label: "Antiques & Collectibles"
    }, {
      id:  529,
      label: "Apparel",
      children: [{
        id: 530,
        label: "Athletic Apparel"
      }, {
        id: 531,
        label: "Casual Apparel"
      }, {
        id: 532,
        label: "Children's Clothing"
      }, {
        id: 533,
        label: "Clothing Accessories"
      }, {
        id: 534,
        label: "Costumes"
      }, {
        id: 535,
        label: "Eyewear"
      }, {
        id: 536,
        label: "Footwear"
      }, {
        id: 537,
        label: "Formal Wear"
      }, {
        id: 538,
        label: "Headwear"
      }, {
        id: 539,
        label: "Men's Clothing"
      }, {
        id: 540,
        label: "Swimwear"
      }, {
        id: 541,
        label: "Undergarments"
      }, {
        id: 542,
        label: "Women's Clothing"
      }, {
        id: 1169,
        label: "Apparel Services"
      }, {
        id: 1170,
        label: "Outerwear"
      }, {
        id: 1171,
        label: "Pants & Shorts"
      }, {
        id: 1172,
        label: "Shirts & Tops"
      }, {
        id: 1173,
        label: "Sleepwear"
      }, {
        id: 1174,
        label: "Suits & Business Attire"
      }, {
        id: 1175,
        label: "Uniforms & Workwear"
      }, {
        id: 1176,
        label: "Other"
      }]
    }, {
      id:  543,
      label: "Auctions"
    }, {
      id:  544,
      label: "Classifieds"
    }, {
      id:  545,
      label: "Consumer Resources",
      children: [{
        id: 546,
        label: "Consumer Advocacy & Protection"
      }, {
        id: 547,
        label: "Coupons & Discount Offers"
      }, {
        id: 548,
        label: "Product Reviews & Price Comparisons"
      }, {
        id: 1177,
        label: "Customer Services"
      }, {
        id: 1178,
        label: "Identity Theft Protection"
      }, {
        id: 1179,
        label: "Other"
      }]
    }, {
      id:  549,
      label: "Entertainment Media",
      children: [{
        id: 550,
        label: "Entertainment Media Rentals"
      }, {
        id: 1181,
        label: "Other"
      }]
    }, {
      id:  551,
      label: "Gifts & Special Event Items",
      children: [{
        id: 552,
        label: "Cards & Greetings"
      }, {
        id: 553,
        label: "Flowers"
      }, {
        id: 554,
        label: "Gifts"
      }, {
        id: 1182,
        label: "Custom & Personalized Items"
      }, {
        id: 1183,
        label: "Greeting Cards"
      }, {
        id: 1184,
        label: "Party & Holiday Supplies"
      }, {
        id: 1185,
        label: "Other"
      }]
    }, {
      id:  555,
      label: "Luxury Goods"
    }, {
      id:  556,
      label: "Mass Merchants & Department Stores"
    }, {
      id:  557,
      label: "Photo & Video Services",
      children: [{
        id: 1187,
        label: "Event & Studio Photography"
      }, {
        id: 1188,
        label: "Photo Printing Services"
      }, {
        id: 1189,
        label: "Stock Photography"
      }, {
        id: 1190,
        label: "Other"
      }]
    }, {
      id:  558,
      label: "Tobacco Products"
    }, {
      id:  559,
      label: "Toys",
      children: [{
        id: 560,
        label: "Building Toys"
      }, {
        id: 561,
        label: "Die-cast & Toy Vehicles"
      }, {
        id: 562,
        label: "Dolls & Accessories"
      }, {
        id: 563,
        label: "Ride-On Toys & Wagons"
      }, {
        id: 564,
        label: "Stuffed Toys"
      }, {
        id: 1194,
        label: "Action Figures"
      }, {
        id: 1195,
        label: "Educational Toys"
      }, {
        id: 1196,
        label: "Outdoor Toys & Play Equipment"
      }, {
        id: 1197,
        label: "Puppets"
      }, {
        id: 1198,
        label: "Other"
      }]
    }, {
      id:  1168,
      label: "Other"
    }, {
      id:  1180,
      label: "Discount & Outlet Stores"
    }, {
      id:  1186,
      label: "Green & Eco-Friendly Shopping"
    }, {
      id:  1191,
      label: "Shopping Portals"
    }, {
      id:  1192,
      label: "Swap Meets & Outdoor Markets"
    }, {
      id:  1193,
      label: "Tobacco & Vaping Products"
    }, {
      id:  1199,
      label: "Wholesalers & Liquidators"
    }]
  }, {
    id:  565,
    label: "Sports",
    children: [{
      id:  566,
      label: "Animal Sports",
      children: [{
        id: 1201,
        label: "Equestrian"
      }, {
        id: 1202,
        label: "Other"
      }]
    }, {
      id:  567,
      label: "College Sports"
    }, {
      id:  568,
      label: "Combat Sports",
      children: [{
        id: 569,
        label: "Boxing"
      }, {
        id: 570,
        label: "Martial Arts"
      }, {
        id: 571,
        label: "Wrestling"
      }, {
        id: 1203,
        label: "Fencing"
      }, {
        id: 1204,
        label: "Other"
      }]
    }, {
      id:  572,
      label: "Extreme Sports",
      children: [{
        id: 573,
        label: "Drag & Street Racing"
      }, {
        id: 1205,
        label: "Climbing & Mountaineering"
      }, {
        id: 1206,
        label: "Stunts & Dangerous Feats"
      }, {
        id: 1207,
        label: "Other"
      }]
    }, {
      id:  574,
      label: "Fantasy Sports"
    }, {
      id:  575,
      label: "Individual Sports",
      children: [{
        id: 576,
        label: "Cycling"
      }, {
        id: 577,
        label: "Golf"
      }, {
        id: 578,
        label: "Gymnastics"
      }, {
        id: 579,
        label: "Racquet Sports"
      }, {
        id: 580,
        label: "Skate Sports"
      }, {
        id: 581,
        label: "Track & Field"
      }, {
        id: 1208,
        label: "Bowling"
      }, {
        id: 1209,
        label: "Running & Walking"
      }, {
        id: 1210,
        label: "Other"
      }]
    }, {
      id:  582,
      label: "International Sports Competitions",
      children: [{
        id: 583,
        label: "Olympics"
      }, {
        id: 1211,
        label: "Other"
      }]
    }, {
      id:  584,
      label: "Motor Sports",
      children: [{
        id: 1212,
        label: "Auto Racing"
      }, {
        id: 1213,
        label: "Motorcycle Racing"
      }, {
        id: 1214,
        label: "Other"
      }]
    }, {
      id:  585,
      label: "Sporting Goods",
      children: [{
        id: 586,
        label: "Sports Memorabilia"
      }, {
        id: 587,
        label: "Winter Sports Equipment"
      }, {
        id: 1216,
        label: "American Football Equipment"
      }, {
        id: 1217,
        label: "Baseball Equipment"
      }, {
        id: 1218,
        label: "Basketball Equipment"
      }, {
        id: 1219,
        label: "Bowling Equipment"
      }, {
        id: 1220,
        label: "Combat Sports Equipment"
      }, {
        id: 1221,
        label: "Cricket Equipment"
      }, {
        id: 1222,
        label: "Electric Skateboards & Scooters"
      }, {
        id: 1223,
        label: "Equestrian Equipment & Tack"
      }, {
        id: 1224,
        label: "Golf Equipment"
      }, {
        id: 1225,
        label: "Gymnastics Equipment"
      }, {
        id: 1226,
        label: "Hockey Equipment"
      }, {
        id: 1227,
        label: "Ice Skating Equipment"
      }, {
        id: 1228,
        label: "Roller Skating & Rollerblading Equipment"
      }, {
        id: 1229,
        label: "Skateboarding Equipment"
      }, {
        id: 1230,
        label: "Soccer Equipment"
      }, {
        id: 1231,
        label: "Squash & Racquetball Equipment"
      }, {
        id: 1232,
        label: "Table Tennis Equipment"
      }, {
        id: 1233,
        label: "Tennis Equipment"
      }, {
        id: 1234,
        label: "Volleyball Equipment"
      }, {
        id: 1235,
        label: "Water Sports Equipment"
      }, {
        id: 1236,
        label: "Other"
      }]
    }, {
      id:  588,
      label: "Sports Coaching & Training"
    }, {
      id:  589,
      label: "Team Sports",
      children: [{
        id: 590,
        label: "American Football"
      }, {
        id: 591,
        label: "Australian Football"
      }, {
        id: 592,
        label: "Baseball"
      }, {
        id: 593,
        label: "Basketball"
      }, {
        id: 594,
        label: "Cheerleading"
      }, {
        id: 595,
        label: "Cricket"
      }, {
        id: 596,
        label: "Hockey"
      }, {
        id: 597,
        label: "Rugby"
      }, {
        id: 598,
        label: "Soccer"
      }, {
        id: 599,
        label: "Volleyball"
      }, {
        id: 1238,
        label: "Handball"
      }, {
        id: 1239,
        label: "Other"
      }]
    }, {
      id:  600,
      label: "Water Sports",
      children: [{
        id: 601,
        label: "Surfing"
      }, {
        id: 602,
        label: "Swimming"
      }, {
        id: 1240,
        label: "Other"
      }]
    }, {
      id:  603,
      label: "Winter Sports",
      children: [{
        id: 604,
        label: "Ice Skating"
      }, {
        id: 605,
        label: "Skiing & Snowboarding"
      }, {
        id: 1241,
        label: "Other"
      }]
    }, {
      id:  1200,
      label: "Other"
    }, {
      id:  1215,
      label: "Sport Scores & Statistics"
    }, {
      id:  1237,
      label: "Sports Fan Gear & Apparel"
    }]
  }, {
    id:  606,
    label: "Travel",
    children: [{
      id:  607,
      label: "Air Travel",
      children: [{
        id: 608,
        label: "Airport Parking & Transportation"
      }]
    }, {
      id:  609,
      label: "Bus & Rail"
    }, {
      id:  610,
      label: "Car Rental & Taxi Services"
    }, {
      id:  611,
      label: "Cruises & Charters"
    }, {
      id:  612,
      label: "Hotels & Accommodations",
      children: [{
        id: 613,
        label: "Vacation Rentals & Short-Term Stays"
      }]
    }, {
      id:  614,
      label: "Specialty Travel"
    }, {
      id:  615,
      label: "Tourist Destinations",
      children: [{
        id: 616,
        label: "Beaches & Islands"
      }, {
        id: 617,
        label: "Mountain & Ski Resorts"
      }, {
        id: 618,
        label: "Regional Parks & Gardens"
      }, {
        id: 619,
        label: "Theme Parks"
      }, {
        id: 620,
        label: "Zoos-Aquariums-Preserves"
      }]
    }]
  }, {
    id:  1242,
    label: "Other",
    children: [{
      id:  1243,
      label: "Vacation Rentals & Short-Term Stays",
      children: [{
        id: 1244,
        label: "Other"
      }]
    }, {
      id:  1245,
      label: "Backpacks & Utility Bags",
      children: [{
        id: 1246,
        label: "Other"
      }]
    }, {
      id:  1247,
      label: "Adventure Travel",
      children: [{
        id: 1248,
        label: "Agritourism"
      }, {
        id: 1249,
        label: "Business Travel"
      }, {
        id: 1250,
        label: "Ecotourism"
      }, {
        id: 1251,
        label: "Family Travel"
      }, {
        id: 1252,
        label: "Honeymoons & Romantic Getaways"
      }, {
        id: 1253,
        label: "Low Cost & Last Minute Travel"
      }, {
        id: 1254,
        label: "Luxury Travel"
      }, {
        id: 1255,
        label: "Medical Tourism"
      }, {
        id: 1256,
        label: "Religious Travel"
      }, {
        id: 1257,
        label: "Other"
      }]
    }, {
      id:  1258,
      label: "Beaches & Islands",
      children: [{
        id: 1259,
        label: "Historical Sites & Buildings"
      }, {
        id: 1260,
        label: "Mountain & Ski Resorts"
      }, {
        id: 1261,
        label: "Regional Parks & Gardens"
      }, {
        id: 1262,
        label: "Theme Parks"
      }, {
        id: 1263,
        label: "Vineyards & Wine Tourism"
      }, {
        id: 1264,
        label: "Zoos, Aquariums & Preserves"
      }, {
        id: 1265,
        label: "Other"
      }]
    }, {
      id:  1266,
      label: "Air Travel",
      children: [{
        id: 1267,
        label: "Car Rentals"
      }, {
        id: 1268,
        label: "Carpooling"
      }, {
        id: 1269,
        label: "Chartered Transportation Rentals"
      }, {
        id: 1270,
        label: "Cruises & Charters"
      }, {
        id: 1271,
        label: "Long Distance Bus & Rail"
      }, {
        id: 1272,
        label: "Other"
      }, {
        id: 1273,
        label: "Scooter & Bike Rentals"
      }, {
        id: 1274,
        label: "Taxi & Ride Hail Services"
      }, {
        id: 1275,
        label: "Traffic & Route Planners"
      }, {
        id: 1276,
        label: "Urban Transit"
      }]
    }, {
      id:  1277,
      label: "Guided Tours & Escorted Vacations",
      children: [{
        id: 1278,
        label: "Sightseeing Tours"
      }, {
        id: 1279,
        label: "Vacation Offers"
      }, {
        id: 1280,
        label: "Other"
      }]
    }, {
      id:  1281,
      label: "Travel Guides & Travelogues"
    }]
  }]
  
  
