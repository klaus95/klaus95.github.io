var commands = 
                {
                    "more":
                            {
                                "description":"The more command is used to read more about a specified project or experience. Use the list command to view all experieces and projects.",
                                "arg-min":2,
                                "arg-max":2,
                                "commands":
                                            [
                                                "-p [name]",
                                                "-e [name]"
                                            ]
                            },

                    "download": 
                                {
                                    "description":"The download command is used to download the resume.",
                                    "arg-min":1,
                                    "arg-max":1,
                                    "commands":
                                                [
                                                    "resume"
                                                ]
                                },

                    "play":
                            {
                                "description":"The play command is used to play different aviable games in the terminal",
                                "arg-min":1,
                                "arg-max":1,
                                "commands":
                                            [
                                                "game_1",
                                                "game_2"
                                            ]
                            },

                    "list": 
                            {
                                "description":"The list command is used to list relevent files or information about me.",
                                "arg-min":1,
                                "arg-max":2,
                                "commands":
                                            [
                                                "contacts",
                                                "skills",
                                                "experiences",
                                                "awards",
                                                "education",
                                                "projects",
                                                "courses",
                                                "games",
                                                "[project-name] files",
                                                "[project-name] technologies",
                                                "[project-name] members"
                                            ]
                            },

                    "help": 
                            {
                                "description":"The help command is used to display all the aviable commands that the terminal offers.",
                                "arg-min":0,
                                "arg-max":0,
                            },

                    "clear": 
                            {
                                "description":"The clear command clears all the previous terminal activity done by the user.",
                                "arg-min":0,
                                "arg-max":0,
                            },

                    "man": 
                            {
                                "description":"The man command is used to get more details about a specific command.",
                                "arg-min":1,
                                "arg-max":1,
                                "commands":
                                            [
                                                "open",
                                                "list",
                                                "download",
                                                "play",
                                                "clear",
                                                "help",
                                                "man"
                                            ]
                            },

                };

var resume = 
                {
                    "skills":
                                {
                                    "languages":
                                                    [
                                                        "Java",
                                                        "Python",
                                                        "C",
                                                        "C++",
                                                        "C#",
                                                        "x86 Assembly Language",
                                                        "SQL",
                                                        "HTML",
                                                        "CSS",
                                                        "Javascript",
                                                        "Ada",
                                                        "Swift"
                                                    ],

                                    "concepts":
                                                    [
                                                        "Object-Oriented Programming",
                                                        "Network Programing",
                                                        "GUI",
                                                        "Threads"
                                                    ],
                                    "tools":
                                                    [
                                                        "MS Visual Studio",
                                                        "Xcode",
                                                        "MySQL Workbench",
                                                        "Git",
                                                        "Eclipse",
                                                        "IntelliJ IDEA",
                                                        "Unit",
                                                        "Photoshop",
                                                        "MS Office"
                                                    ]
                                },
                    
                    "contacts":
                                {
                                    "Email":"mailto:klauscipi@gmail.com",
                                    "Phone Number":"+1 (774) 329-1220",
                                    "LinkedIn":"https://www.linkedin.com/in/klauscipi/",
                                    "Twitter":"https://twitter.com/CipiKlaus",
                                    "Facebook":"https://www.facebook.com/thisisklauus",
                                    "GitHub":"https://github.com/klaus95"
                                },

                    "education": 
                                    {
                                        "Florida Instiute of Technology": 
                                                                            {
                                                                                "level":"University",
                                                                                "grade":"3.97/4.00",
                                                                                "location":"Melbourne, Florida",
                                                                                "start":"August 25th, 2015",
                                                                                "end":"May 4th, 2019",
                                                                                "degree":"Bachelor's degree in Computer Science"
                                                                            },
                                        "Harry T. Fultz": 
                                                                            {
                                                                                "level":"High School",
                                                                                "grade":"10.14/10.40",
                                                                                "location":"Tirane, Albania",
                                                                                "start":"September 12th, 2015",
                                                                                "end":"June 5th, 2015",
                                                                                "degree":"High School Diploma"
                                                                            }

                                    },

                    "awards":
                                [
                                    {
                                        "name":"Summa Cum Laude",
                                        "description":"Graduated from Florida Tech with the highest honors.",
                                        "date":"May 2019"
                                    },                                        
                                    {
                                        "name":"Distinguished Student Scholar",
                                        "description":"\"Following each fall semester, all undergraduate students who have a cumulative GPA of 3.8 or higher and have completed more than 52 credit hours at Florida Tech are recipients of Distinguished Student Scholar recognition\" (Florida Institute of Technology).",
                                        "date":"May 2019"
                                    },
                                    {
                                        "name":"Distinguished Student Scholar",
                                        "description":"\"Following each fall semester, all undergraduate students who have a cumulative GPA of 3.8 or higher and have completed more than 52 credit hours at Florida Tech are recipients of Distinguished Student Scholar recognition\" (Florida Institute of Technology).",
                                        "date":"May 2018"
                                    },
                                    {
                                        "name":"Distinguished Student Scholar",
                                        "description":"\"Following each fall semester, all undergraduate students who have a cumulative GPA of 3.8 or higher and have completed more than 52 credit hours at Florida Tech are recipients of Distinguished Student Scholar recognition\" (Florida Institute of Technology).",
                                        "date":"May 2017"
                                    },
                                    {
                                        "name":"Elected Member of UPE Computing Honor Society",
                                        "description":"International Honor Society for the Computing and Information Disciplines, is the first honor society dedicated to the discipline of the computing and information disciplines.Upsilon Pi Epsilon is endorsed by the Association for Computing Machinery (ACM) and the Institute of Electrical and Electronics Engineers Computer Society (IEEE-CS), the two largest computer organizations in the world.",
                                        "date":"August 2017"
                                    }
                                ],

                    "courses":
                                [
                                    "Programming in a Second Language (C++)",
                                    "Operating Systems Concepts",
                                    "Network Programming",
                                    "Introduction to Artificial Intelligence",
                                    "Game Design",
                                    "Database Systems",
                                    "Computer Architecture and Assembly Programming",
                                    "Algorithms and Data Structures (Java)",
                                    "Analysis of Algorithms",
                                    "Senior Design"
                                ],

                    "experiences":
                                    [
                                        {
                                            "company":"Florida Institute of Technology",
                                            "reference":"sysadmin",
                                            "title":"Student System Administrator",
                                            "start":"Feb 2019",
                                            "end":"May 2019",
                                            "files": 
                                                    [
                                                        "controlAPI.py"
                                                    ],
                                            "responsibilities":
                                                                [
                                                                    "DigitalSign Project: Configured a Raspberry Pi 3 Model B+ to work as a digital sign for the Department of Computer Science at Florida Tech.",
                                                                    "Developed Python scripts to automate the process of uploading, previewing, and updating the content of the digital sign by faculty members."

                                                                ],
                                            "duration":"4 months"
                                        },
                                        {
                                            "company":"IDEA-TEL SH.P.K.",
                                            "reference":"intern",
                                            "title":"Software Engineer Intern",
                                            "start":"May 2018",
                                            "end":"August 2018",
                                            "files":
                                                    [
                                                        "main.jpg",
                                                        "main2.jpg"
                                                    ],
                                            "responsibilities":
                                                                [
                                                                    "Designed and developed a Java GUI application utilized by Albanian Naval Force to visualize, manage, and display military devices’ status, location, and live working condition on a map.", 
                                                                    "Application features multi-threading for live updates, relational database in SQL, and a modern GUI with drag-and-drop functionality and customizable maps."
                                                                ],
                                            "duration":"4 months"
                                        },
                                        {
                                            "company":"Florida Institute of Technology",
                                            "reference":"assistent",
                                            "title":"Professor Assitent",
                                            "start":"June 2017",
                                            "end":"June 2017",
                                            "files":[],
                                            "responsibilities":
                                                                [
                                                                    "Assisted a group of high school students to complete computing tasks.",
                                                                    "Provided assistance on designing, grading, and writing Java and Alice programs."
                                                                ],
                                            "duration":"1 month"
                                        },
                                        {
                                            "company":"Florida Institute of Technology",
                                            "reference":"help-desk",
                                            "title":"CS Help Desk Volunteer",
                                            "start":"August 2017",
                                            "end":"May 2019",
                                            "files":[],
                                            "responsibilities": 
                                                                [
                                                                    "Voluntarily providing instructional assistance on computing topics to Florida Tech students at the CS Help Desk, which is an academic support center with a focus on computing."
                                                                ],
                                            "duration":"1 year and 7 months"
                                        }

                                    ],

                    "projects":
                                [
                                    {
                                        "name":"Product",
                                        "reference":"pro",
                                        "level":"",
                                        "files":
                                                [
                                                    "file_1",
                                                    "file_2",
                                                    "file_3"
                                                ],
                                        "description":"",
                                        "url":"",
                                        "duration":"",
                                        "date":"",
                                        "tech":
                                                [
                                                    "java",
                                                    "c++",
                                                    "c",
                                                    "c#"
                                                ],
                                        "members":
                                                    [
                                                        "Klaus Cipi",
                                                        "Klaus ",
                                                        "La la land"
                                                    ],
                                        "status":""
                                    },
                                ]
                }