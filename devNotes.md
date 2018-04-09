DevNotes

TODOs

MAIN APPLICATION
1. Incorporate MLC business card graphics into header.

USER MANAGEMENT
1. Create new user generator
    a. ADMIN - create new user + auth code
    b. email auth code to new user
    c. consume auth code as URL parameter
    d. include tier system
    e. module release function
    f. build out current module or modified startDate for allow for managent of modules.

ADMINISTRATION
1. Module Management
2. Program Management [ week ]
3. User management

MISC
1. Get rid of old Material-UI references
2. Get Production mode running
3. webpack --progress -p --config webpack.prod.js

johns-MacBook-Pro:macleanlifecoaching johnmclaughlin$ webpack --progress -p --config webpack.prod.js
Hash: e0a3e5e11722df5487ab
Version: webpack 3.11.0
Time: 114150ms
        Asset     Size  Chunks                    Chunk Names
    output.js  1.89 MB       0  [emitted]  [big]  main
   styles.css   2.7 kB       0  [emitted]         main
output.js.map  9.32 MB       0  [emitted]         main

johns-MacBook-Pro:macleanlifecoaching johnmclaughlin$ webpack --progress -p --config webpack.prod.js
Hash: e0a3e5e11722df5487ab
Version: webpack 3.11.0
Time: 116606ms
        Asset     Size  Chunks                    Chunk Names
    output.js  1.55 MB       0  [emitted]  [big]  main
   styles.css   2.7 kB       0  [emitted]         main
output.js.map  8.96 MB       0  [emitted]         main

johns-MacBook-Pro:macleanlifecoaching johnmclaughlin$ webpack --progress -p --config webpack.prod.js
Hash: e113b51687792fd993df
Version: webpack 3.11.0
Time: 114146ms
                                    Asset     Size  Chunks                    Chunk Names
                                output.js  1.55 MB       0  [emitted]  [big]  main
                               styles.css   2.7 kB       0  [emitted]         main
main.8921cbc5b39ce00866ee7476d58986e6.css   2.7 kB       0  [emitted]         main
                            output.js.map  8.96 MB       0  [emitted]         main

johns-MacBook-Pro:macleanlifecoaching johnmclaughlin$ webpack --progress -p --config webpack.prod.js
Hash: e113b51687792fd993df
Version: webpack 3.11.0
Time: 111529ms
                                        Asset       Size  Chunks                    Chunk Names
                                    output.js    1.55 MB       0  [emitted]  [big]  main
                                   styles.css    2.74 kB       0  [emitted]         main
    main.8921cbc5b39ce00866ee7476d58986e6.css    2.77 kB       0  [emitted]         main
                                output.js.map    8.96 MB       0  [emitted]         main
                               styles.css.map   87 bytes       0  [emitted]         main
main.8921cbc5b39ce00866ee7476d58986e6.css.map  118 bytes       0  [emitted]         main

johns-MacBook-Pro:macleanlifecoaching johnmclaughlin$ webpack --progress -p --config webpack.dev.js
Hash: eb36359bc8ab7faf4457
Version: webpack 3.11.0
Time: 15464ms
     Asset     Size  Chunks                    Chunk Names
 output.js  13.6 MB       0  [emitted]  [big]  main
styles.css   2.7 kB       0  [emitted]         main