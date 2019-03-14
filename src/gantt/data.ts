/**
 * TreeGrid DataSource
 */

export let projectNewData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product concept',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3 },
            {
                TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 2,
                Predecessor: '2', Progress: 30
            },
        ]
    },
    {
        TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3,4',
        Indicators: [
            {
                'date': '04/10/2019',
                'name': '#briefing',
                'title': 'Product concept breifing',
            }
        ]
    },
    {
        TaskID: 6,
        TaskName: 'Market research',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 7,
                TaskName: 'Demand analysis',
                StartDate: new Date('04/04/2019'),
                EndDate: new Date('04/21/2019'),
                subtasks: [
                    {
                        TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/04/2019'), Duration: 4,
                        Predecessor: '5', Progress: 30
                    },
                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '5' }
                ]
            },
            {
                TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/04/2019'), Duration: 4,
                Predecessor: '7, 8', Progress: 30
            },
            { TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '9' },
            {
                TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/04/2019'), Duration: 0, Predecessor: '10',
                Indicators: [
                    {
                        'date': '04/20/2019',
                        'name': '#meeting',
                        'title': '1st board of directors meeting',
                    }
                ]
            }
        ]
    },
    {
        TaskID: 13,
        TaskName: 'Product design and development',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 14, TaskName: 'Functionality design', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '12'
            },
            { TaskID: 15, TaskName: 'Quality design', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '12' },
            { TaskID: 16, TaskName: 'Define reliability', StartDate: new Date('04/04/2019'), Duration: 2, Progress: 30, Predecessor: '15' },
            { TaskID: 17, TaskName: 'Identifying raw materials', StartDate: new Date('04/04/2019'), Duration: 2, Predecessor: '15' },
            {
                TaskID: 18,
                TaskName: 'Define cost plan',
                StartDate: new Date('04/04/2019'),
                EndDate: new Date('04/21/2019'),
                subtasks: [
                    {
                        TaskID: 19, TaskName: 'Manufacturing cost', StartDate: new Date('04/04/2019'),
                        Duration: 2, Progress: 30, Predecessor: '17'
                    },
                    { TaskID: 20, TaskName: 'Selling cost', StartDate: new Date('04/04/2019'), Duration: 2, Predecessor: '17' }
                ]
            },
            {
                TaskID: 21,
                TaskName: 'Development of the final design',
                StartDate: new Date('04/04/2019'),
                EndDate: new Date('04/21/2019'),
                subtasks: [
                    {
                        TaskID: 22, TaskName: 'Defining dimensions and package volume', StartDate: new Date('04/04/2019'),
                        Duration: 2, Progress: 30, Predecessor: '19,20'
                    },
                    {
                        TaskID: 23, TaskName: 'Develop design to meet industry standards', StartDate: new Date('04/04/2019'),
                        Duration: 2, Predecessor: '22'
                    },
                    { TaskID: 24, TaskName: 'Include all the details', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '23' }
                ]
            },
            {
                TaskID: 25, TaskName: 'CAD computer-aided design', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '24'
            },
            { TaskID: 26, TaskName: 'CAM computer-aided manufacturing', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '25' },
            {
                TaskID: 27, TaskName: 'Design complete', StartDate: new Date('04/04/2019'), Duration: 0, Predecessor: '26',
                Indicators: [
                    {
                        'date': '05/18/2019',
                        'name': '#meeting',
                        'title': '2nd board of directors meeting',
                    }
                ]
            }

        ]
    },
    { TaskID: 28, TaskName: 'Prototype testing', StartDate: new Date('04/04/2019'), Duration: 4, Progress: 30, Predecessor: '27' },
    { TaskID: 29, TaskName: 'Include feedback', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '28ss' },
    { TaskID: 30, TaskName: 'Manufacturing', StartDate: new Date('04/04/2019'), Duration: 5, Progress: 30, Predecessor: '28,29' },
    { TaskID: 31, TaskName: 'Assembling materials to finsihed goods', StartDate: new Date('04/04/2019'), Duration: 5, Predecessor: '30' },
    {
        TaskID: 32,
        TaskName: 'Feedback and testing',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 33, TaskName: 'Internal testing and feedback', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 45, Predecessor: '31'
            },
            {
                TaskID: 34, TaskName: 'Customer testing and feedback', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 50, Predecessor: '33'
            }
        ]
    },
    {
        TaskID: 35,
        TaskName: 'Final product development',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 36, TaskName: 'Important improvements', StartDate: new Date('04/04/2019'),
                Duration: 4, Progress: 30, Predecessor: '34'
            },
            {
                TaskID: 37, TaskName: 'Address any unforeseen issues', StartDate: new Date('04/04/2019'),
                Duration: 4, Progress: 30, Predecessor: '36ss'
            }
        ]
    },
    {
        TaskID: 38,
        TaskName: 'Final product',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 39, TaskName: 'Branding product', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '37' },
            {
                TaskID: 40, TaskName: 'Marketing and presales', StartDate: new Date('04/04/2019'),
                Duration: 4, Progress: 30, Predecessor: '39'
            }
        ]
    }
];

export let editingResources: Object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer' },
    { resourceId: 2, resourceName: 'Rose Fuller' },
    { resourceId: 3, resourceName: 'Margaret Buchanan' },
    { resourceId: 4, resourceName: 'Fuller King' },
    { resourceId: 5, resourceName: 'Davolio Fuller' },
    { resourceId: 6, resourceName: 'Van Jack' },
    { resourceId: 7, resourceName: 'Fuller Buchanan' },
    { resourceId: 8, resourceName: 'Jack Davolio' },
    { resourceId: 9, resourceName: 'Tamer Vinet' },
    { resourceId: 10, resourceName: 'Vinet Fuller' },
    { resourceId: 11, resourceName: 'Bergs Anton' },
    { resourceId: 12, resourceName: 'Construction Supervisor' }
];

export let editingData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2019'), Duration: 0,
                Progress: 30, resources: [1], info: 'Measure the total property area alloted for construction'
            },
            {
                TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Predecessor: '2',
                resources: [2, 3, 5], info: 'Obtain an engineered soil test of lot where construction is planned.' +
                    'From an engineer or company specializing in soil testing'
            },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30 },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'),
                Duration: 3, Predecessor: '4', Progress: 30, resources: 4,
                info: 'Develop floor plans and obtain a materials list for estimations'
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'),
                Duration: 3, Predecessor: '6', resources: [4, 8], info: ''
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'),
                Duration: 0, Predecessor: '7', resources: [12, 5], info: ''
            }
        ]
    },
    {
        TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/04/2019'), Duration: 1,
        Predecessor: '8', Progress: 30, resources: [12],
        info: 'If required obtain approval from HOA (homeowners association) or ARC (architectural review committee)'
    },
    {
        TaskID: 10,
        TaskName: 'Project approval and kick off',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        Duration: 0,
        Predecessor: '9'
    },
    {
        TaskID: 11,
        TaskName: 'Site work',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 12, TaskName: 'Clear the building site', StartDate: new Date('04/04/2019'),
                Duration: 2, Progress: 30, Predecessor: '9', resources: [6, 7],
                info: 'Clear the building site (demolition of existing home if necessary)'
            },
            {
                TaskID: 13, TaskName: 'Install temporary power service', StartDate: new Date('04/04/2019'),
                Duration: 2, Predecessor: '12', resources: [6, 7], info: ''
            },
        ]
    },
    {
        TaskID: 14,
        TaskName: 'Foundation',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 15, TaskName: 'Excavate for foundations', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '13', resources: [2, 8],
                info: 'Excavate the foundation and dig footers (Scope of work is dependent of foundation designed by engineer)'
            },
            {
                TaskID: 16, TaskName: 'Dig footer', StartDate: new Date('04/04/2019'),
                Duration: 2, Predecessor: '15FF', resources: [8], info: ''
            },
            {
                TaskID: 17, TaskName: 'Install plumbing grounds', StartDate: new Date('04/04/2019'), Duration: 4,
                Progress: 30, Predecessor: '15', resources: [9], info: ''
            },
            {
                TaskID: 18, TaskName: 'Pour a foundation and footer with concrete', StartDate: new Date('04/04/2019'),
                Duration: 1, Predecessor: '17', resources: [8, 9, 10], info: ''
            },
            {
                TaskID: 19, TaskName: 'Cure basement walls', StartDate: new Date('04/04/2019'), Duration: 4,
                Progress: 30, Predecessor: '18', resources: [10], info: ''
            },
        ]
    },
    {
        TaskID: 20,
        TaskName: 'Framing',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 21, TaskName: 'Add load-bearing structure', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '19', resources: [4, 5],
                info: 'Build the main load-bearing structure out of thick pieces of wood and' +
                    'possibly metal I-beams for large spans with few supports'
            },
            {
                TaskID: 22, TaskName: 'Install floor joists', StartDate: new Date('04/04/2019'),
                Duration: 3, Predecessor: '21', resources: [2, 3], info: 'Add floor and ceiling joists and install subfloor panels'
            },
            {
                TaskID: 23, TaskName: 'Add ceiling joists', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '22SS', resources: [5], info: ''
            },
            {
                TaskID: 24, TaskName: 'Install subfloor panels', StartDate: new Date('04/04/2019'),
                Duration: 3, Predecessor: '23', resources: [8, 9]
            },
            {
                TaskID: 25, TaskName: 'Frame floor walls', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '24', resources: [10], info: ''
            },
            {
                TaskID: 26, TaskName: 'Frame floor decking', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '25SS', resources: [4, 8], info: ''
            },
        ]
    },
    {
        TaskID: 27,
        TaskName: 'Exterior finishing',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 28, TaskName: 'Cover outer walls and roof in OSB', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '26', resources: [2, 8],
                info: 'Cover outer walls and roof in OSB or plywood and a water-resistive barrier'
            },
            {
                TaskID: 29, TaskName: 'Add water resistive barrier', StartDate: new Date('04/04/2019'),
                Duration: 3, Predecessor: '28', resources: [1, 10],
                info: 'Cover the walls with siding, typically vinyl, wood, or brick veneer but possibly stone or other materials'
            },
            {
                TaskID: 30, TaskName: 'Install roof shingles', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '29', resources: [8, 9], info: 'Install roof shingles or other covering for flat roof'
            },
            { TaskID: 31, TaskName: 'Install windows', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '29', resources: 7 },
        ]
    },
    {
        TaskID: 32,
        TaskName: 'Utilities',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 33, TaskName: 'Install internal plumbing', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '26', resources: [1, 10]
            },
            {
                TaskID: 34, TaskName: 'Install HVAC', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '33',
                resources: [4, 9], info: 'Add internal plumbing, HVAC, electrical, and natural gas utilities'
            },
            {
                TaskID: 35, TaskName: 'Electrical utilities', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '34'
            },
            {
                TaskID: 36, TaskName: 'Natural gas utilities', StartDate: new Date('04/04/2019'), Duration: 3,
                Predecessor: '35', resources: 11
            },
            {
                TaskID: 37, TaskName: 'Install bathroom fixtures', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '35', resources: [3, 7]
            },
        ],
        info: 'Building inspector visits if necessary to approve utilities and framing'
    },
    {
        TaskID: 38,
        TaskName: 'Interior finsihing',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 39, TaskName: 'Install insulation', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '37', resources: [1, 8], info: 'Frame interior walls with wooden 2×4s'
            },
            {
                TaskID: 40, TaskName: 'Install  drywall panels', StartDate: new Date('04/04/2019'), Duration: 3,
                Predecessor: '39', resources: 5,
                info: 'Install insulation and interior drywall panels (cementboard for wet areas) and to complete walls and ceilings'
            },
            {
                TaskID: 41, TaskName: 'Spackle', StartDate: new Date('04/04/2019'), Duration: 3,
                Progress: 30, Predecessor: '40', resources: 10
            },
            {
                TaskID: 42, TaskName: 'Apply primer', StartDate: new Date('04/04/2019'), Duration: 3,
                Predecessor: '41', resources: [10, 11]
            },
            {
                TaskID: 43, TaskName: 'Paint wall and ceilings', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '42', resources: [2, 9]
            },
            {
                TaskID: 44, TaskName: 'Install modular kitchen', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '43', resources: [5, 7]
            },
        ]
    },
    {
        TaskID: 45,
        TaskName: 'Flooring',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 46, TaskName: 'Tile kitchen, bathroom and entry walls', StartDate: new Date('04/04/2019'),
                Duration: 3, Progress: 30, Predecessor: '44', resources: [4, 9, 3],
                info: 'Additional tiling on top of cementboard for wet areas, such as the bathroom and kitchen backsplash'
            },
            {
                TaskID: 47, TaskName: 'Tile floor', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '46SS',
                resources: [2, 8], info: 'Installation of final floor covering, such as floor tile, carpet, or wood flooring'
            },
        ]
    },
    {
        TaskID: 48,
        TaskName: 'Final Acceptance',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            {
                TaskID: 49, TaskName: 'Final inspection', StartDate: new Date('04/04/2019'), Duration: 2,
                Progress: 30, Predecessor: '47', resources: 12, info: 'Ensure the contracted items'
            },
            {
                TaskID: 50, TaskName: 'Cleanup for occupancy', StartDate: new Date('04/04/2019'), Duration: 2,
                Predecessor: '49', resources: [1, 5], info: 'Installation of major appliances'
            },
            {
                TaskID: 51, TaskName: 'Property handover', StartDate: new Date('04/04/2019'), Duration: 0,
                Predecessor: '50', info: 'Ending the contract'
            },
        ]
    },
];

export let filteredData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Launch and flight to lunar orbit',
        StartDate: new Date('07/16/1969'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Apollo 11 blasts off from launch pad', StartDate: new Date('07/16/1969 03:32:00 AM'),
                EndDate: new Date('07/16/1969 03:32:00 AM'), Duration: 0,
            },
            {
                TaskID: 3, TaskName: 'Entry to earth’s orbit', StartDate: new Date('07/16/1969 03:32:00 AM'),
                EndDate: new Date('07/16/1969 03:44:00 AM'), Predecessor: '2FS'
            },
            {
                TaskID: 4, TaskName: 'Travelling in earth’s orbit', StartDate: new Date('07/16/1969 03:44:00 AM'),
                EndDate: new Date('07/16/1969 04:22:13 AM'), Predecessor: '3FS'
            },
            {
                TaskID: 5, TaskName: 'Trajectory change toward the Moon', StartDate: new Date('07/16/1969 04:22:13 AM'),
                EndDate: new Date('07/16/1969 04:52:00 AM'), Predecessor: '4FS'
            },
            {
                TaskID: 6, TaskName: 'extraction maneuver performed', StartDate: new Date('07/16/1969 04:52:00 AM'),
                EndDate: new Date('07/16/1969 04:52:00 AM'), Predecessor: '5FS'
            },
            {
                TaskID: 7, TaskName: 'Travelling toward moon and entering into lunar orbit', StartDate: new Date('07/16/1969 04:52:00 AM'),
                EndDate: new Date('07/16/1969 04:21:50 PM'), Predecessor: '6FS'
            },
            {
                TaskID: 8, TaskName: 'Midcourse correction, sharpening the course and testing the engine',
                StartDate: new Date('07/16/1969 11:22:00 PM'), EndDate: new Date('07/17/1969 05:21:50 AM')
            },
            {
                TaskID: 9, TaskName: 'Reached half the distance spanning between earth and moon',
                StartDate: new Date('07/17/1969 05:22:00 AM'), EndDate: new Date('07/17/1969 08:00:50 PM')
            },
            {
                TaskID: 10, TaskName: 'Reached 3/4th distance spanning between earth and moon',
                StartDate: new Date('07/17/1969 8:02:00 PM'), EndDate: new Date('07/18/1969 04:21:50 PM')
            },
            {
                TaskID: 11, TaskName: 'Reached distance 45000 miles from moon',
                StartDate: new Date('07/18/1969 11:22:00 PM'), EndDate: new Date('07/19/1969 05:21:50 PM')
            },
        ]
    },
    {
        TaskID: 12,
        TaskName: 'Lunar descent',
        StartDate: new Date('07/19/1969 05:21:50 PM'),
        subtasks: [
            {
                TaskID: 13, TaskName: 'Lunar orbiting (30 orbits)', StartDate: new Date('07/19/1969 05:21:50 PM'),
                EndDate: new Date('07/20/1969 12:52:00 AM'), Predecessor: '11FS'
            },
            {
                TaskID: 14, TaskName: 'Landing site identified', StartDate: new Date('07/20/1969 12:52:00 AM'),
                EndDate: new Date('07/20/1969 12:52:00 AM'), Predecessor: '13FS'
            },
            {
                TaskID: 15, TaskName: 'Eagle separated from Columbia.', StartDate: new Date('07/20/1969 05:44:00 PM'),
                EndDate: new Date('07/20/1969 05:44:00 PM')
            },
            {
                TaskID: 16, TaskName: 'Eagle’s decent to Moon', StartDate: new Date('07/20/1969 05:44:00 PM'),
                EndDate: new Date('07/20/1969 08:16:40 PM'), Predecessor: '15FS'
            }
        ]
    },
    {
        TaskID: 17,
        TaskName: 'Landing',
        StartDate: new Date('07/20/1969 08:17:40 PM'),
        subtasks: [
            {
                TaskID: 18, TaskName: 'Eagle’s touch down', StartDate: new Date('07/20/1969 08:17:40 PM'),
                EndDate: new Date('07/20/1969 08:17:40 PM')
            },
            {
                TaskID: 19, TaskName: 'Radio communication and performing post landing checklist',
                StartDate: new Date('07/20/1969 08:17:40 PM'), EndDate: new Date('07/20/1969 11:43:00 PM'), Predecessor: '18FS'
            },
            {
                TaskID: 20, TaskName: 'Preparations for EVA (Extra Vehicular Activity)',
                StartDate: new Date('07/20/1969 11:43:00 PM'), EndDate: new Date('07/21/1969 02:39:33 AM'), Predecessor: '19FS'
            },
            {
                TaskID: 21, TaskName: 'Hatch open and climbing down the moon', StartDate: new Date('07/21/1969 02:39:33 AM'),
                EndDate: new Date('07/21/1969 02:56:15 AM'), Predecessor: '20FS'
            },
            {
                TaskID: 22, TaskName: 'Armstrong stepped down on the moon', StartDate: new Date('07/21/1969 02:56:15 AM'),
                EndDate: new Date('07/21/1969 03:11:00 AM'), Predecessor: '21FS'
            },
        ]
    },
    {
        TaskID: 23,
        TaskName: 'Lunar surface operations',
        StartDate: new Date('07/21/1969'),
        subtasks: [
            {
                TaskID: 24, TaskName: 'Soil sample collections', StartDate: new Date('07/21/1969 02:56:15 AM'),
                EndDate: new Date('07/21/1969 03:11:00 AM')
            },
            {
                TaskID: 25, TaskName: 'Aldrin joined armstrong', StartDate: new Date('07/21/1969 03:11:00 AM'),
                EndDate: new Date('07/21/1969 03:41:00 AM'), Predecessor: '24FS'
            },
            {
                TaskID: 26, TaskName: 'planted the lunar flag assembly', StartDate: new Date('07/21/1969 03:41:00 AM'),
                EndDate: new Date('07/21/1969 03:46:00 AM'), Predecessor: '25FS'
            },
            {
                TaskID: 27, TaskName: 'President richard nixon’s telephone-radio transmission ',
                StartDate: new Date('07/21/1969 03:48:00 AM'), EndDate: new Date('07/21/1969 03:51:00 AM')
            },
            {
                TaskID: 28, TaskName: 'Collect rock samples, photos and other mission controls',
                StartDate: new Date('07/21/1969 03:52:00 AM'), EndDate: new Date('07/21/1969 04:50:00 AM')
            },
        ]
    },
    {
        TaskID: 29,
        TaskName: 'Lunar ascent',
        StartDate: new Date('07/21/1969'),
        subtasks: [
            {
                TaskID: 30, TaskName: 'Climbing the eagle to ascent', StartDate: new Date('07/21/1969 04:51:00 AM'),
                EndDate: new Date('07/21/1969 05:00:00 AM')
            },
            {
                TaskID: 31, TaskName: 'Hatch closing', StartDate: new Date('07/21/1969 05:01:00 AM'),
                EndDate: new Date('07/21/1969 05:01:00 AM'), Predecessor: '30FS'
            },
            {
                TaskID: 32, TaskName: 'Final housekeeping', StartDate: new Date('07/21/1969 05:02:00 AM'),
                EndDate: new Date('07/21/1969 08:00:00 AM')
            },
            {
                TaskID: 33, TaskName: 'Resting of astronauts', StartDate: new Date('07/21/1969 08:00:00 AM'),
                EndDate: new Date('07/21/1969 03:00:00 PM'), Predecessor: '32FS'
            },
            {
                TaskID: 34, TaskName: 'Preparation for lift off and ascent engine started', StartDate: new Date('07/21/1969 03:00:00 PM'),
                EndDate: new Date('07/21/1969 05:54:00 PM'), Predecessor: '33FS'
            },
            {
                TaskID: 35, TaskName: 'Eagle lifted off', StartDate: new Date('07/21/1969 05:54:00 PM'),
                EndDate: new Date('07/21/1969 05:54:00 PM'), Predecessor: '34FS'
            },
            {
                TaskID: 36, TaskName: 'Eagle’s travel toward Columbia', StartDate: new Date('07/21/1969 05:54:00 PM'),
                EndDate: new Date('07/21/1969 09:23:00 PM'), Predecessor: '35FS'
            },
        ]
    },
    {
        TaskID: 37,
        TaskName: 'Return',
        StartDate: new Date('07/21/1969 09:24:00 PM'),
        subtasks: [
            {
                TaskID: 38, TaskName: 'Eagle docked with columbia', StartDate: new Date('07/21/1969 09:24:00 PM'),
                EndDate: new Date('07/21/1969 09:35:00 PM')
            },
            {
                TaskID: 39, TaskName: 'Eagle’s ascent stage jettisoned into lunar orbit', StartDate: new Date('07/21/1969 09:35:00 PM'),
                EndDate: new Date('07/21/1969 11:41:00 PM'), Predecessor: '38FS'
            },
        ]
    },
    {
        TaskID: 40,
        TaskName: 'Decent toward earth  and Splashdown',
        StartDate: new Date('07/21/1969'),
        subtasks: [
            {
                TaskID: 41, TaskName: 'Spacecraft reaches 1/4th distance spanning between moon and earth',
                StartDate: new Date('07/21/1969 11:50:00 PM'), EndDate: new Date('07/22/1969 04:40:00 PM')
            },
            {
                TaskID: 42, TaskName: 'Spacecraft travels to midway point of journey',
                StartDate: new Date('07/22/1969 04:40:00 PM'), EndDate: new Date('07/23/1969 04:00:00 PM'), Predecessor: '41FS'
            },
            {
                TaskID: 43, TaskName: 'Spacecraft travels to 3/4th point of journey', StartDate: new Date('07/23/1969 04:40:00 PM'),
                EndDate: new Date('07/24/1969 10:00:00 AM'), Predecessor: '42FS'
            },
            {
                TaskID: 44, TaskName: 'Crew prepares for splashdown', StartDate: new Date('07/24/1969 11:47:00 AM'),
                EndDate: new Date('07/24/1969 04:20:00 PM')
            },
            {
                TaskID: 45, TaskName: 'Command and service modules separates', StartDate: new Date('07/24/1969 04:20:00 PM'),
                EndDate: new Date('07/24/1969 04:35:00 PM'), Predecessor: '44FS'
            },
            {
                TaskID: 46, TaskName: 'Command module re-enters the Earth’s atmosphere', StartDate: new Date('07/24/1969 04:35:00 PM'),
                EndDate: new Date('07/24/1969 04:50:00 PM'), Predecessor: '45FS'
            },
            {
                TaskID: 47, TaskName: 'Spacecraft splashes near USS hornet', StartDate: new Date('07/24/1969 04:51:00 PM'),
                EndDate: new Date('07/24/1969 04:51:00 PM')
            },
        ]
    }
];

export let projectResources: Object[] = [
    { resourceId: 1, resourceName: 'Project Manager' },
    { resourceId: 2, resourceName: 'Software Analyst' },
    { resourceId: 3, resourceName: 'Developer' },
    { resourceId: 4, resourceName: 'Testing Engineer' }
];

export let projectData: Object[] = [
    {
        taskID: 1,
        taskName: 'Project schedule',
        startDate: new Date('02/08/2019'),
        endDate: new Date('03/15/2019'),
        subtasks: [
            {
                taskID: 2,
                taskName: 'Planning',
                startDate: new Date('02/08/2019'),
                endDate: new Date('02/12/2019'),
                subtasks: [
                    {
                        taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/08/2019'),
                        endDate: new Date('02/12/2019'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 4, taskName: 'Plan budget', startDate: new Date('02/08/2019'),
                        endDate: new Date('02/12/2019'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/08/2019'),
                        endDate: new Date('02/12/2019'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 6, taskName: 'Planning complete', startDate: new Date('02/10/2019'),
                        endDate: new Date('02/10/2019'), duration: 0, predecessor: '3FS,4FS,5FS'
                    }
                ]
            }, {
                taskID: 7,
                taskName: 'Design',
                startDate: new Date('02/15/2019'),
                endDate: new Date('02/19/2019'),
                subtasks: [
                    {
                        taskID: 8, taskName: 'Software specification', startDate: new Date('02/15/2019'),
                        endDate: new Date('02/17/2019'), duration: 3, progress: '60', predecessor: '6FS', resourceId: [2]
                    },
                    {
                        taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/15/2019'),
                        endDate: new Date('02/17/2019'), duration: 3, progress: '100', predecessor: '6FS', resourceId: [3]
                    },
                    {
                        taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/18/2019'),
                        endDate: new Date('02/19/2019'), duration: 2, progress: '100', predecessor: '9FS', resourceId: [1]
                    },
                    {
                        taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2019'),
                        endDate: new Date('02/17/2019'), duration: 0, predecessor: '10FS'
                    }
                ]
            },
            {
                taskID: 12,
                taskName: 'Implementation phase',
                startDate: new Date('02/25/2019'),
                endDate: new Date('03/05/2019'),
                subtasks: [
                    {
                        taskID: 13,
                        taskName: 'Phase 1',
                        startDate: new Date('02/25/2019'),
                        endDate: new Date('03/07/2019'),
                        subtasks: [{
                            taskID: 14,
                            taskName: 'Implementation module 1',
                            startDate: new Date('02/25/2019'),
                            endDate: new Date('03/07/2019'),
                            subtasks: [
                                {
                                    taskID: 15, taskName: 'Development task 1', startDate: new Date('02/22/2019'),
                                    endDate: new Date('02/24/2019'), duration: 3, progress: '50', predecessor: '11FS', resourceId: [3]
                                },
                                {
                                    taskID: 16, taskName: 'Development task 2', startDate: new Date('02/22/2019'),
                                    endDate: new Date('02/24/2019'), duration: 3, progress: '50', predecessor: '11FS', resourceId: [3]
                                },
                                {
                                    taskID: 17, taskName: 'Testing', startDate: new Date('02/25/2019'),
                                    endDate: new Date('02/26/2019'), duration: 2, progress: '0', predecessor: '15FS,16FS', resourceId: [4]
                                },
                                {
                                    taskID: 18, taskName: 'Bug fix', startDate: new Date('03/01/2019'),
                                    endDate: new Date('03/02/2019'), duration: 2, progress: '0', predecessor: '17FS', resourceId: [3]
                                },
                                {
                                    taskID: 19, taskName: 'Customer review meeting', startDate: new Date('03/03/2019'),
                                    endDate: new Date('03/07/2019'), duration: 2, progress: '0', predecessor: '18FS', resourceId: [1]
                                },
                                {
                                    taskID: 20, taskName: 'Phase 1 complete', startDate: new Date('03/05/2019'),
                                    endDate: new Date('03/05/2019'), duration: 0, predecessor: '19FS'
                                }

                            ]
                        }]
                    },

                    {
                        taskID: 21,
                        taskName: 'Phase 2',
                        startDate: new Date('02/25/2019'),
                        endDate: new Date('03/05/2019'),
                        subtasks: [{
                            taskID: 22,
                            taskName: 'Implementation module 2',
                            startDate: new Date('02/25/2019'),
                            endDate: new Date('03/05/2019'),
                            subtasks: [
                                {
                                    taskID: 23, taskName: 'Development task 1', startDate: new Date('02/22/2019'),
                                    endDate: new Date('02/25/2019'), duration: 4, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 24, taskName: 'Development task 2', startDate: new Date('02/22/2019'),
                                    endDate: new Date('02/25/2019'), duration: 4, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 25, taskName: 'Testing', startDate: new Date('02/26/2019'),
                                    endDate: new Date('03/01/2019'), duration: 2, progress: '0', predecessor: '23FS,24FS', resourceId: [4]
                                },
                                {
                                    taskID: 26, taskName: 'Bug fix', startDate: new Date('03/02/2019'),
                                    endDate: new Date('03/03/2019'), duration: 2, progress: '0', predecessor: '25FS', resourceId: [3]
                                },
                                {
                                    taskID: 27, taskName: 'Customer review meeting', startDate: new Date('03/07/2019'),
                                    endDate: new Date('03/09/2019'), duration: 2, progress: '0', predecessor: '26FS', resourceId: [1]
                                },
                                {
                                    taskID: 28, taskName: 'Phase 2 complete', startDate: new Date('03/03/2019'),
                                    endDate: new Date('03/03/2019'), duration: 0, predecessor: '27FS'
                                }

                            ]
                        }]
                    },

                    {
                        taskID: 29,
                        taskName: 'Phase 3',
                        startDate: new Date('02/25/2019'),
                        endDate: new Date('03/07/2019'),
                        subtasks: [{
                            taskID: 30,
                            taskName: 'Implementation module 3',
                            startDate: new Date('02/25/2019'),
                            endDate: new Date('03/07/2019'),
                            subtasks: [
                                {
                                    taskID: 31, taskName: 'Development task 1', startDate: new Date('02/22/2019'),
                                    endDate: new Date('02/24/2019'), duration: 3, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 32, taskName: 'Development task 2', startDate: new Date('02/22/2019'),
                                    endDate: new Date('02/24/2019'), duration: 3, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 33, taskName: 'Testing', startDate: new Date('02/25/2019'), endDate: new Date('02/26/2019'),
                                    duration: 2, progress: '0', predecessor: '31FS,32FS', resourceId: [4]
                                },
                                {
                                    taskID: 34, taskName: 'Bug fix', startDate: new Date('03/01/2019'), endDate: new Date('03/05/2019'),
                                    duration: 2, progress: '0', predecessor: '33FS', resourceId: [3]
                                },
                                {
                                    taskID: 35, taskName: 'Customer review meeting', startDate: new Date('03/03/2019'),
                                    endDate: new Date('03/04/2019'), duration: 2, progress: '0', predecessor: '34FS',
                                    resourceId: [1]
                                },
                                {
                                    taskID: 36, taskName: 'Phase 3 complete', startDate: new Date('03/02/2019'),
                                    endDate: new Date('03/02/2019'), duration: 0, predecessor: '35FS'
                                },

                            ]
                        }]
                    }
                ]
            },
            {
                taskID: 37, taskName: 'Integration', startDate: new Date('03/08/2019'), endDate: new Date('03/10/2019'), duration: 3,
                progress: '0', predecessor: '20FS,28FS,36FS', resourceId: [3]
            },
            {
                taskID: 38, taskName: 'Final testing', startDate: new Date('03/11/2019'), endDate: new Date('03/12/2019'), duration: 2,
                progress: '0', predecessor: '37FS', resourceId: [4]
            },
            {
                taskID: 39, taskName: 'Final delivery', startDate: new Date('03/10/2019'), endDate: new Date('03/10/2019'),
                duration: 0, predecessor: '38FS'
            }
        ]
    }
];

export let baselineData: Object[] = [
    {
        TaskId: 1, TaskName: 'Receive vehicle and create job card', BaselineStartDate: new Date('03/05/2018 10:00:00 AM'),
        BaselineEndDate: new Date('03/05/2018 10:00:00 AM'), StartDate: new Date('03/05/2018 10:00:00 AM'),
        EndDate: new Date('03/05/2018 10:00:00 AM')
    },
    {
        TaskId: 2, TaskName: 'Allot mechanic and send vehicle to service bay', BaselineStartDate: new Date('03/05/2018 10:00:00 AM'),
        BaselineEndDate: new Date('03/05/2018 10:15:00 AM'), StartDate: new Date('03/05/2018 10:15:00 AM'),
        EndDate: new Date('03/05/2018 10:20:00 AM')
    },
    {
        TaskId: 3, TaskName: 'Change the receive vehicle and create job cardengine oil',
        BaselineStartDate: new Date('03/05/2018 10:15:00 AM'),
        BaselineEndDate: new Date('03/05/2018 10:45:00 AM'), StartDate: new Date('03/05/2018 10:20:00 AM'),
        EndDate: new Date('03/05/2018 10:35:00 AM')
    },
    {
        TaskId: 4, TaskName: 'Replace the oil filter', BaselineStartDate: new Date('03/05/2018 10:45:00 AM'),
        BaselineEndDate: new Date('03/05/2018 11:15:00 AM'), StartDate: new Date('03/05/2018 10:35:00 AM'),
        EndDate: new Date('03/05/2018 11:00:00 AM')
    },
    {
        TaskId: 5, TaskName: 'Replace the air filter', BaselineStartDate: new Date('03/05/2018 10:45:00 AM'),
        BaselineEndDate: new Date('03/05/2018 11:15:00 AM'), StartDate: new Date('03/05/2018 10:35:00 AM'),
        EndDate: new Date('03/05/2018 11:00:00 AM')
    },
    {
        TaskId: 6, TaskName: 'Replace the fuel filter', BaselineStartDate: new Date('03/05/2018 11:15:00 AM'),
        BaselineEndDate: new Date('03/05/2018 11:25:00 AM'), StartDate: new Date('03/05/2018 11:00:00 AM'),
        EndDate: new Date('03/05/2018 11:20:00 AM')
    },
    {
        TaskId: 7, TaskName: 'Replace the cabin filter', BaselineStartDate: new Date('03/05/2018 11:00:00 AM'),
        BaselineEndDate: new Date('03/05/2018 11:20:00 AM'), StartDate: new Date('03/05/2018 11:00:00 AM'),
        EndDate: new Date('03/05/2018 11:25:00 AM')
    },
    {
        TaskId: 8, TaskName: 'Replace the spark plugs', BaselineStartDate: new Date('03/05/2018 11:00:00 AM'),
        BaselineEndDate: new Date('03/05/2018 11:30:00 AM'), StartDate: new Date('03/05/2018 11:25:00 AM'),
        EndDate: new Date('03/05/2018 11:45:00 AM')
    },
    {
        TaskId: 9, TaskName: 'Check level and refill brake fluid/clutch fluid', BaselineStartDate: new Date('03/05/2018 11:20:00 AM'),
        BaselineEndDate: new Date('03/05/2018 11:40:00 AM'), StartDate: new Date('03/05/2018 11:30:00 AM'),
        EndDate: new Date('03/05/2018 11:50:00 AM')
    },
    {
        TaskId: 10, TaskName: 'Check Brake Pads/Liners, Brake Discs/Drums, and replace if worn out.',
        BaselineStartDate: new Date('03/05/2018 11:40:00 AM'),
        BaselineEndDate: new Date('03/05/2018 12:00:00 PM'), StartDate: new Date('03/05/2018 11:50:00 AM'),
        EndDate: new Date('03/05/2018 12:20:00 PM')
    },
    {
        TaskId: 11, TaskName: 'Check level and refill power steering fluid', BaselineStartDate: new Date('03/05/2018 11:40:00 AM'),
        BaselineEndDate: new Date('03/05/2018 12:00:00 PM'), StartDate: new Date('03/05/2018 11:50:00 AM'),
        EndDate: new Date('03/05/2018 12:15:00 PM')
    },
    {
        TaskId: 12, TaskName: 'Check level and refill automatic/manual transmission fluid',
        BaselineStartDate: new Date('03/05/2018 12:00:00 PM'),
        BaselineEndDate: new Date('03/05/2018 12:35:00 PM'), StartDate: new Date('03/05/2018 11:50:00 AM'),
        EndDate: new Date('03/05/2018 12:20:00 PM')
    },
    {
        TaskId: 13, TaskName: 'Grease and lubricate components', BaselineStartDate: new Date('03/05/2018 12:20:00 PM'),
        BaselineEndDate: new Date('03/05/2018 12:35:00 PM'), StartDate: new Date('03/05/2018 12:20:00 PM'),
        EndDate: new Date('03/05/2018 12:45:00 PM')
    },
    {
        TaskId: 14, TaskName: 'Inspect and replace the timing belt or timing chain if needed',
        BaselineStartDate: new Date('03/05/2018 12:35:00 PM'),
        BaselineEndDate: new Date('03/05/2018 1:00:00 PM'), StartDate: new Date('03/05/2018 12:45:00 PM'),
        EndDate: new Date('03/05/2018 1:00:00 PM')
    },
    {
        TaskId: 15, TaskName: 'Wheel balancing', BaselineStartDate: new Date('03/05/2018 1:00:00 PM'),
        BaselineEndDate: new Date('03/05/2018 1:20:00 PM'), StartDate: new Date('03/05/2018 1:00:00 PM'),
        EndDate: new Date('03/05/2018 1:45:00 PM')
    },
    {
        TaskId: 16, TaskName: 'Wheel alignment', BaselineStartDate: new Date('03/05/2018 1:20:00 PM'),
        BaselineEndDate: new Date('03/05/2018 1:45:00 PM'), StartDate: new Date('03/05/2018 1:45:00 PM'),
        EndDate: new Date('03/05/2018 2:45:00 PM')
    },
    {
        TaskId: 17, TaskName: 'Check for proper operation of all lights, wipers etc.', BaselineStartDate: new Date('03/05/2018 1:50:00 PM'),
        BaselineEndDate: new Date('03/05/2018 02:30:00 PM'), StartDate: new Date('03/05/2018 02:45:00 PM'),
        EndDate: new Date('03/05/2018 03:30:00 PM')
    },
    {
        TaskId: 18, TaskName: 'Check for any error codes in the ECU and take corrective action.',
        BaselineStartDate: new Date('03/05/2018 2:30:00 PM'),
        BaselineEndDate: new Date('03/05/2018 3:30:00 PM'), StartDate: new Date('03/05/2018 03:30:00 PM'),
        EndDate: new Date('03/05/2018 04:15:00 PM')
    },
    {
        TaskId: 19, TaskName: 'Use scan tool read trouble code', BaselineStartDate: new Date('03/05/2018 03:30:00 PM'),
        BaselineEndDate: new Date('03/05/2018 04:45:00 PM'), StartDate: new Date('03/05/2018 04:15:00 PM'),
        EndDate: new Date('03/05/2018 04:45:00 PM')
    },
    {
        TaskId: 20, TaskName: 'Exterior washing', BaselineStartDate: new Date('03/05/2018 04:45:00 PM'),
        BaselineEndDate: new Date('03/05/2018 05:15:00 PM'), StartDate: new Date('03/05/2018 04:45:00 PM'),
        EndDate: new Date('03/05/2018 05:30:00 PM')
    },
    {
        TaskId: 21, TaskName: 'Interior vacuuming', BaselineStartDate: new Date('03/05/2018 05:15:00 PM'),
        BaselineEndDate: new Date('03/05/2018 05:45:00 PM'), StartDate: new Date('03/05/2018 05:30:00 PM'),
        EndDate: new Date('03/05/2018 06:00:00 PM')
    },
    {
        TaskId: 22, TaskName: 'Final service inspection', BaselineStartDate: new Date('03/05/2018 05:45:00 PM'),
        BaselineEndDate: new Date('03/05/2018 06:00:00 PM'), StartDate: new Date('03/05/2018 06:00:00 PM'),
        EndDate: new Date('03/05/2018 06:30:00 PM')
    },
    {
        TaskId: 23, TaskName: 'Vehicle handover', BaselineStartDate: new Date('03/05/2018 06:00:00 PM'),
        BaselineEndDate: new Date('03/05/2018 06:00:00 PM'), StartDate: new Date('03/05/2018 06:30:00 PM'),
        EndDate: new Date('03/05/2018 06:30:00 PM')
    }
];