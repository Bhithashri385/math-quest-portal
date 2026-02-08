/**
 * Math Quest Portal - Expanded Question Bank
 * Questions inspired by international math competitions
 * 
 * Coverage: All grade levels (1-12)
 * Total: 350+ questions across all grade levels
 */

const questionBank = {
    "1-2": [
        // === 3-POINT QUESTIONS (Easy) ===
        // 2010-2015 Style
        { id: 1, question: "A kangaroo makes 3 jumps. Each jump is 2 meters long. How far does the kangaroo travel?", options: ["3 m", "5 m", "6 m", "7 m", "8 m"], correctAnswer: 2, points: 3 },
        { id: 2, question: "Zara has 8 balloons. 3 fly away. How many are left?", options: ["3", "4", "5", "6", "11"], correctAnswer: 2, points: 3 },
        { id: 3, question: "Kai has 4 toy cars. His brother gives him 3 more. How many does Kai have?", options: ["1", "4", "6", "7", "12"], correctAnswer: 3, points: 3 },
        { id: 4, question: "What comes next: ○ ● ○ ● ○ ● ○ ?", options: ["○", "●", "□", "■", "△"], correctAnswer: 1, points: 3 },
        { id: 5, question: "A ladybug has 6 legs. How many legs do 2 ladybugs have?", options: ["6", "8", "10", "12", "14"], correctAnswer: 3, points: 3 },
        { id: 6, question: "Priya is 7 years old. Her sister is 2 years younger. How old is the sister?", options: ["2", "3", "4", "5", "9"], correctAnswer: 3, points: 3 },
        { id: 7, question: "How many corners does a rectangle have?", options: ["2", "3", "4", "5", "6"], correctAnswer: 2, points: 3 },
        { id: 8, question: "Count: ★ ★ ★ ★ ★ ★. How many stars?", options: ["4", "5", "6", "7", "8"], correctAnswer: 2, points: 3 },
        { id: 9, question: "What number comes after 19?", options: ["18", "20", "21", "29", "91"], correctAnswer: 1, points: 3 },
        { id: 10, question: "Ravi has 5 red and 4 green apples. How many total?", options: ["1", "4", "5", "9", "20"], correctAnswer: 3, points: 3 },
        // 2016-2020 Style
        { id: 11, question: "A bicycle has 2 wheels. How many wheels do 3 bicycles have?", options: ["3", "5", "6", "8", "9"], correctAnswer: 2, points: 3 },
        { id: 12, question: "Which shape has 3 sides?", options: ["Circle", "Square", "Triangle", "Rectangle", "Pentagon"], correctAnswer: 2, points: 3 },
        { id: 13, question: "What is 7 + 5?", options: ["10", "11", "12", "13", "14"], correctAnswer: 2, points: 3 },
        { id: 14, question: "How many fingers on two hands?", options: ["5", "8", "10", "12", "20"], correctAnswer: 2, points: 3 },
        { id: 15, question: "Luna has 10 cookies. She eats 3. How many left?", options: ["3", "5", "7", "10", "13"], correctAnswer: 2, points: 3 },
        { id: 16, question: "A dog has 4 legs. How many legs do 2 dogs have?", options: ["4", "6", "8", "10", "12"], correctAnswer: 2, points: 3 },
        { id: 17, question: "What is 8 - 3?", options: ["3", "4", "5", "6", "11"], correctAnswer: 2, points: 3 },
        { id: 18, question: "How many ears does a rabbit have?", options: ["1", "2", "3", "4", "5"], correctAnswer: 1, points: 3 },
        // 2021-2025 Style
        { id: 19, question: "A hand has 5 fingers. How many fingers on 3 hands?", options: ["8", "10", "12", "15", "20"], correctAnswer: 3, points: 3 },
        { id: 20, question: "What number is between 6 and 8?", options: ["5", "6", "7", "8", "9"], correctAnswer: 2, points: 3 },
        { id: 21, question: "Count the dots: • • • • •", options: ["3", "4", "5", "6", "7"], correctAnswer: 2, points: 3 },
        { id: 22, question: "A triangle has how many corners?", options: ["1", "2", "3", "4", "5"], correctAnswer: 2, points: 3 },
        { id: 23, question: "What is 6 + 4?", options: ["8", "9", "10", "11", "12"], correctAnswer: 2, points: 3 },
        { id: 24, question: "Nico has 9 marbles. He loses 4. How many left?", options: ["4", "5", "6", "9", "13"], correctAnswer: 1, points: 3 },
        { id: 25, question: "Which is smallest: 15, 51, 11?", options: ["15", "51", "11", "All same", "Cannot tell"], correctAnswer: 2, points: 3 },

        // === 4-POINT QUESTIONS (Medium) ===
        { id: 26, question: "Aisha has 10 candies. She eats 3 and gives 2 away. How many left?", options: ["3", "4", "5", "6", "7"], correctAnswer: 2, points: 4 },
        { id: 27, question: "A snail climbs 4 steps up, slides 2 down. Which step is it on?", options: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 6"], correctAnswer: 1, points: 4 },
        { id: 28, question: "Monday is day 1. What is day 5?", options: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], correctAnswer: 2, points: 4 },
        { id: 29, question: "Omar gives 4 apples away and has 6 left. How many did he start with?", options: ["2", "6", "8", "10", "12"], correctAnswer: 3, points: 4 },
        { id: 30, question: "A frog jumps 3 pads forward, 1 back. Starting at 1, where is it?", options: ["Pad 1", "Pad 2", "Pad 3", "Pad 4", "Pad 5"], correctAnswer: 2, points: 4 },
        { id: 31, question: "How many days in 2 weeks?", options: ["7", "10", "12", "14", "21"], correctAnswer: 3, points: 4 },
        { id: 32, question: "A rabbit eats 2 carrots daily. How many in 5 days?", options: ["5", "7", "8", "10", "12"], correctAnswer: 3, points: 4 },
        { id: 33, question: "What is 15 - 8?", options: ["5", "6", "7", "8", "23"], correctAnswer: 2, points: 4 },
        { id: 34, question: "4 birds on tree, 3 come, 2 fly away. How many now?", options: ["3", "4", "5", "6", "9"], correctAnswer: 2, points: 4 },
        { id: 35, question: "One rope is 8 cm, another 5 cm. How much longer is the first?", options: ["2 cm", "3 cm", "4 cm", "5 cm", "13 cm"], correctAnswer: 1, points: 4 },
        { id: 36, question: "12 cookies on 3 plates equally. How many per plate?", options: ["3", "4", "5", "6", "9"], correctAnswer: 1, points: 4 },
        { id: 37, question: "Pattern: 2, 4, 6, ?, 10. What's missing?", options: ["5", "7", "8", "9", "12"], correctAnswer: 2, points: 4 },
        { id: 38, question: "A clock shows 3:00. What time in 2 hours?", options: ["4:00", "5:00", "6:00", "1:00", "2:00"], correctAnswer: 1, points: 4 },
        { id: 39, question: "Yuki is 8. His dad is 30. How much older is dad?", options: ["22", "24", "28", "32", "38"], correctAnswer: 0, points: 4 },
        { id: 40, question: "A pencil costs 5 cents. How much for 4 pencils?", options: ["9 cents", "15 cents", "20 cents", "25 cents", "40 cents"], correctAnswer: 2, points: 4 },

        // === 5-POINT QUESTIONS (Hard) ===
        { id: 41, question: "Theo puts 15 marbles equally in 3 boxes. How many per box?", options: ["3", "4", "5", "6", "12"], correctAnswer: 2, points: 5 },
        { id: 42, question: "Ivy finished before Theo but after Jade. Who won?", options: ["Ivy", "Theo", "Jade", "Tie", "Cannot tell"], correctAnswer: 2, points: 5 },
        { id: 43, question: "A train has 5 carriages with 4 wheels each. Total wheels?", options: ["9", "15", "16", "20", "25"], correctAnswer: 3, points: 5 },
        { id: 44, question: "Nadia gives equal stickers to 4 friends from 20. How many each?", options: ["4", "5", "6", "8", "10"], correctAnswer: 1, points: 5 },
        { id: 45, question: "Today is Tuesday. What day was 3 days ago?", options: ["Friday", "Saturday", "Sunday", "Monday", "Wednesday"], correctAnswer: 1, points: 5 },
        { id: 46, question: "A toy costs $8. Yuki has $5. Mom gives some more. How much from mom?", options: ["$2", "$3", "$4", "$5", "$8"], correctAnswer: 1, points: 5 },
        { id: 47, question: "3 red, 4 blue, 2 green balls. Total?", options: ["6", "7", "8", "9", "10"], correctAnswer: 3, points: 5 },
        { id: 48, question: "A spider has 8 legs. 3 spiders have how many legs?", options: ["11", "16", "21", "24", "32"], correctAnswer: 3, points: 5 },
        { id: 49, question: "What's the sum of 1+2+3+4?", options: ["8", "9", "10", "11", "12"], correctAnswer: 2, points: 5 },
        { id: 50, question: "A book has 20 pages. I read 8. How many left?", options: ["8", "10", "12", "14", "28"], correctAnswer: 2, points: 5 },
        
        // === ADDITIONAL QUESTIONS ===
        { id: 51, question: "If you count by 2s starting from 2, what is the 5th number?", options: ["8", "9", "10", "11", "12"], correctAnswer: 2, points: 3 },
        { id: 52, question: "How many legs do 4 chairs have altogether?", options: ["8", "12", "16", "20", "24"], correctAnswer: 2, points: 3 },
        { id: 53, question: "What coin equals 5 pennies?", options: ["Penny", "Nickel", "Dime", "Quarter", "Dollar"], correctAnswer: 1, points: 3 },
        { id: 54, question: "A square has sides of 3 cm. What is the perimeter?", options: ["6 cm", "9 cm", "12 cm", "15 cm", "18 cm"], correctAnswer: 2, points: 4 },
        { id: 55, question: "I am thinking of a number. If I add 5, I get 12. What is my number?", options: ["5", "6", "7", "8", "17"], correctAnswer: 2, points: 4 },
        { id: 56, question: "How many sides does a stop sign have?", options: ["4", "5", "6", "7", "8"], correctAnswer: 4, points: 3 },
        { id: 57, question: "What is half of 18?", options: ["6", "7", "8", "9", "10"], correctAnswer: 3, points: 4 },
        { id: 58, question: "3 + 3 + 3 + 3 = ?", options: ["9", "10", "11", "12", "13"], correctAnswer: 3, points: 3 },
        { id: 59, question: "A baker made 24 cookies. He put 6 on each plate. How many plates?", options: ["3", "4", "5", "6", "18"], correctAnswer: 1, points: 5 },
        { id: 60, question: "What is the value of 3 dimes?", options: ["3 cents", "13 cents", "30 cents", "33 cents", "300 cents"], correctAnswer: 2, points: 4 },
        
        // === KANGAROO 2014 FELIX QUESTIONS ===
        // 5-point questions (2014)
        { id: 61, question: "How many numbers using only digits 1, 2, or 3 are bigger than 10 and smaller than 32? (Digits can repeat)", options: ["2", "4", "6", "7", "8"], correctAnswer: 3, points: 5 },
        { id: 62, question: "The rabbit family eats either 10 carrots OR 2 cabbages each day. Last week they ate 6 cabbages. How many carrots did they eat?", options: ["20", "30", "34", "40", "50"], correctAnswer: 3, points: 5 },
        { id: 63, question: "Each digit 2, 3, 4, 5 is placed in a box to make two 2-digit numbers that are added. What is the biggest possible sum?", options: ["68", "77", "86", "95", "97"], correctAnswer: 3, points: 5 }
    ],
    
    "3-4": [
        // === 3-POINT QUESTIONS ===
        { id: 1, question: "A clock shows 3:45. What time in 30 minutes?", options: ["3:75", "4:00", "4:15", "4:30", "4:45"], correctAnswer: 2, points: 3 },
        { id: 3, question: "Rectangle: 8m long, 5m wide. Perimeter?", options: ["13 m", "20 m", "26 m", "40 m", "45 m"], correctAnswer: 2, points: 3 },
        { id: 4, question: "36 stickers among 4 friends equally. Each gets?", options: ["6", "8", "9", "10", "12"], correctAnswer: 2, points: 3 },
        { id: 6, question: "Book: 248 pages, read 135. Pages left?", options: ["103", "113", "123", "133", "383"], correctAnswer: 1, points: 3 },
        { id: 8, question: "Kangaroo jumps 7 times, 3m each. Distance?", options: ["10 m", "14 m", "18 m", "21 m", "24 m"], correctAnswer: 3, points: 3 },
        { id: 10, question: "Triangle sides: 5, 7, 9 cm. Perimeter?", options: ["12 cm", "19 cm", "21 cm", "35 cm", "45 cm"], correctAnswer: 2, points: 3 },
        { id: 11, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13", "14"], correctAnswer: 2, points: 3 },
        { id: 12, question: "Apples in bags of 6. Bags needed for 42?", options: ["5", "6", "7", "8", "9"], correctAnswer: 2, points: 3 },
        { id: 13, question: "Largest 2-digit even number?", options: ["88", "96", "98", "99", "100"], correctAnswer: 2, points: 3 },
        { id: 14, question: "Ravi is 9. Dad is 4× older. Dad's age?", options: ["13", "27", "32", "36", "45"], correctAnswer: 3, points: 3 },
        { id: 15, question: "What is 1000 - 456?", options: ["444", "454", "544", "554", "644"], correctAnswer: 2, points: 3 },
        { id: 16, question: "How many sides does an octagon have?", options: ["5", "6", "7", "8", "10"], correctAnswer: 3, points: 3 },
        { id: 18, question: "A dozen eggs is 12. How many in 3 dozen?", options: ["24", "30", "36", "42", "48"], correctAnswer: 2, points: 3 },
        { id: 19, question: "Round 3847 to nearest hundred:", options: ["3800", "3850", "3900", "4000", "3840"], correctAnswer: 0, points: 3 },
        { id: 20, question: "How many hours in 2 days?", options: ["24", "36", "48", "60", "72"], correctAnswer: 2, points: 3 },

        // === 4-POINT QUESTIONS ===
        { id: 21, question: "28 students: 4 more girls than boys. Girls?", options: ["12", "14", "16", "18", "24"], correctAnswer: 2, points: 4 },
        { id: 22, question: "Smallest 3-digit with 5, 0, 3 once?", options: ["035", "053", "305", "350", "503"], correctAnswer: 2, points: 4 },
        { id: 23, question: "Train: 9:45 AM to 11:20 AM. Journey time?", options: ["1h 15m", "1h 25m", "1h 35m", "1h 45m", "2h 35m"], correctAnswer: 2, points: 4 },
        { id: 24, question: "Pattern: 2, 5, 11, 23, ... Next?", options: ["35", "41", "46", "47", "48"], correctAnswer: 3, points: 4 },
        { id: 25, question: "Square perimeter 24 cm. Area?", options: ["16 cm²", "24 cm²", "36 cm²", "48 cm²", "144 cm²"], correctAnswer: 2, points: 4 },
        { id: 26, question: "Think of number, ×3, +7 = 25. Number?", options: ["4", "5", "6", "7", "8"], correctAnswer: 2, points: 4 },
        { id: 27, question: "What fraction of 60 is 15?", options: ["1/2", "1/3", "1/4", "1/5", "1/6"], correctAnswer: 2, points: 4 },
        { id: 28, question: "Odd numbers between 10 and 30?", options: ["8", "9", "10", "11", "15"], correctAnswer: 2, points: 4 },
        { id: 29, question: "Pizza: 8 slices, eat 3. Fraction left?", options: ["3/8", "4/8", "5/8", "6/8", "8/8"], correctAnswer: 2, points: 4 },
        { id: 30, question: "Product is 48, one number is 6. Other?", options: ["6", "7", "8", "9", "42"], correctAnswer: 2, points: 4 },
        { id: 31, question: "Bus holds 45. Buses for 200 people?", options: ["3", "4", "5", "6", "7"], correctAnswer: 2, points: 4 },
        { id: 32, question: "What is 3² + 4²?", options: ["14", "20", "25", "49", "7"], correctAnswer: 2, points: 4 },
        { id: 33, question: "Movie: 2:40 PM + 1h 50m. End time?", options: ["3:90 PM", "4:00 PM", "4:20 PM", "4:30 PM", "4:40 PM"], correctAnswer: 2, points: 4 },
        { id: 34, question: "Average of 10, 20, 30?", options: ["15", "20", "25", "30", "60"], correctAnswer: 1, points: 4 },
        { id: 35, question: "How many faces on a cube?", options: ["4", "5", "6", "8", "12"], correctAnswer: 2, points: 4 },

        // === 5-POINT QUESTIONS ===
        { id: 36, question: "5 children in line. Milo not first/last. Rosa between Milo and Jade. Ethan at end. Olive next to Ethan. Who's middle?", options: ["Milo", "Rosa", "Jade", "Ethan", "Olive"], correctAnswer: 1, points: 5 },
        { id: 37, question: "Chickens + rabbits = 20 heads, 56 legs. Rabbits?", options: ["6", "8", "10", "12", "14"], correctAnswer: 1, points: 5 },
        { id: 38, question: "3 consecutive numbers sum to 48. Largest?", options: ["15", "16", "17", "18", "19"], correctAnswer: 2, points: 5 },
        { id: 39, question: "Magic square 1-9, rows/cols/diags = 15. Center?", options: ["3", "4", "5", "6", "7"], correctAnswer: 2, points: 5 },
        { id: 40, question: "Game: win=5pts, draw=2pts. 10 games, 32pts, 2 draws. Wins?", options: ["4", "5", "6", "7", "8"], correctAnswer: 2, points: 5 },
        { id: 41, question: "Number ÷ 7 = quotient 8, remainder 3. Number?", options: ["53", "56", "59", "61", "67"], correctAnswer: 2, points: 5 },
        { id: 42, question: "Rectangles in 2×3 grid?", options: ["6", "12", "15", "18", "21"], correctAnswer: 3, points: 5 },
        { id: 43, question: "Average of 5 numbers is 20. Remove one, average is 15. Removed?", options: ["20", "30", "35", "40", "45"], correctAnswer: 3, points: 5 },
        { id: 44, question: "Two numbers: sum 50, difference 10. Larger?", options: ["20", "25", "30", "35", "40"], correctAnswer: 2, points: 5 },
        { id: 45, question: "How many 2-digit numbers have digits summing to 10?", options: ["7", "8", "9", "10", "11"], correctAnswer: 2, points: 5 },
        
        // === ADDITIONAL QUESTIONS ===
        { id: 46, question: "What is the least common multiple of 4 and 6?", options: ["2", "10", "12", "24", "48"], correctAnswer: 2, points: 4 },
        { id: 47, question: "A rectangle is 12 cm long and 8 cm wide. What is its area?", options: ["20 cm²", "40 cm²", "80 cm²", "96 cm²", "120 cm²"], correctAnswer: 3, points: 3 },
        { id: 48, question: "What is the sum of the first 5 odd numbers?", options: ["15", "20", "25", "30", "35"], correctAnswer: 2, points: 4 },
        { id: 49, question: "If n × 7 = 91, what is n?", options: ["11", "12", "13", "14", "15"], correctAnswer: 2, points: 3 },
        { id: 50, question: "How many prime numbers are less than 15?", options: ["4", "5", "6", "7", "8"], correctAnswer: 2, points: 4 },
        { id: 51, question: "A car travels 55 miles per hour. How far in 3 hours?", options: ["155 mi", "158 mi", "165 mi", "175 mi", "185 mi"], correctAnswer: 2, points: 3 },
        { id: 52, question: "What is 3/4 of 100?", options: ["25", "50", "75", "80", "90"], correctAnswer: 2, points: 3 },
        { id: 53, question: "The product of two numbers is 144. One is 12. The other?", options: ["10", "11", "12", "13", "14"], correctAnswer: 2, points: 4 },
        { id: 54, question: "What is the perimeter of a regular pentagon with side 7 cm?", options: ["28 cm", "30 cm", "35 cm", "42 cm", "49 cm"], correctAnswer: 2, points: 3 },
        { id: 55, question: "Find the missing number: 2, 6, 18, 54, ?", options: ["108", "126", "162", "180", "216"], correctAnswer: 2, points: 5 },
        
        // === KANGAROO 2009 ÉCOLIER QUESTIONS ===
        // 3-point questions (Kangaroo 2009)
        { id: 56, question: "2 × 9 + 200 + 9 = ?", options: ["292", "209", "290", "272", "227"], correctAnswer: 4, points: 3 },
        { id: 57, question: "Four sticks have 8 ends. How many ends do 7 sticks have?", options: ["6", "8", "12", "13", "14"], correctAnswer: 4, points: 3 },
        { id: 58, question: "Mother bought 16 mandarins. Finn ate half of them, Lily ate two, and Mira ate the rest. How many mandarins did Mira eat?", options: ["4", "6", "8", "10", "12"], correctAnswer: 1, points: 3 },
        { id: 59, question: "Nadia rolled a die four times and scored a total of 23 points. How often did she roll a six?", options: ["0", "1", "2", "3", "4"], correctAnswer: 3, points: 3 },
        { id: 60, question: "A film lasts 90 minutes and begins at 17:10. During the film there are two advert breaks, one lasting 8 minutes and the other 5 minutes. At what time will the film end?", options: ["18:13", "18:27", "18:47", "18:53", "19:13"], correctAnswer: 3, points: 3 },
        
        // 4-point questions (Kangaroo 2009)
        { id: 61, question: "In a dance group there are 25 boys and 19 girls. Every week 2 more boys and 3 more girls join. After how many weeks will there be the same number of boys as girls?", options: ["6", "5", "4", "3", "2"], correctAnswer: 0, points: 4 },
        { id: 62, question: "Omar shared a bar of chocolate. First he broke off a row with 5 pieces for his brother. Then he broke off a column with 7 pieces for his sister. How many pieces were there in the entire bar?", options: ["28", "32", "35", "40", "54"], correctAnswer: 3, points: 4 },
        { id: 63, question: "A farmer has 30 cows, some chickens and no other animals. The total number of chicken legs equals the total number of cow legs. How many animals does the farmer have?", options: ["60", "90", "120", "180", "240"], correctAnswer: 1, points: 4 },
        { id: 64, question: "The length of a rectangle is 8 cm. The width is half as long. How long are the sides of a square that has the same perimeter as the rectangle?", options: ["4 cm", "6 cm", "8 cm", "12 cm", "24 cm"], correctAnswer: 1, points: 4 },
        { id: 65, question: "Three squirrels Anni, Asia and Elli collected 7 nuts total. They all collected different amounts, and each collected at least one. Anni collected the least and Asia the most. How many nuts did Elli collect?", options: ["1", "2", "3", "4", "Not possible to answer"], correctAnswer: 1, points: 4 },
        
        // 5-point questions (Kangaroo 2009)
        { id: 66, question: "A white and a black pig weigh together 320 kg. The black pig weighs 32 kg more than the white one. How much does the white pig weigh?", options: ["128 kg", "144 kg", "160 kg", "176 kg", "192 kg"], correctAnswer: 1, points: 5 },
        { id: 67, question: "Priya and Omar live on the same street. On one side of Priya's house there are 27 houses, and on the other side 13 houses. Omar lives in the house right in the middle of the street. How many houses are between Priya's and Omar's houses?", options: ["6", "7", "8", "14", "21"], correctAnswer: 0, points: 5 },
        { id: 68, question: "A secret agent wants to crack a 6-digit code. The sum of digits in even positions equals the sum of digits in odd positions. Which could be the code? (Format: 12_9_8 means positions 3 and 5 are unknown)", options: ["81__61", "7_727_", "4_4141", "12_9_8", "181_2_"], correctAnswer: 3, points: 5 },
        { id: 69, question: "Tara collects pictures of sports people. Each year she collects as many as in the previous two years combined. In 2008 she had 60 photos and in 2009 she has 96. How many did she have in 2006?", options: ["20", "24", "36", "40", "48"], correctAnswer: 1, points: 5 },
        { id: 70, question: "In a vase there is one red, blue, yellow and white flower. Zoe the bee visits each flower exactly once. She begins with the red flower and never flies directly from yellow to white. In how many different ways can she visit each flower?", options: ["1", "2", "3", "4", "6"], correctAnswer: 3, points: 5 },
        { id: 71, question: "In a haunted house, a ghost disappears at 6:15. A strange clock that showed correct time before starts counting backwards. When the ghost reappears at 19:30 real time, what time does the strange clock show?", options: ["17:00", "17:45", "18:30", "19:00", "19:15"], correctAnswer: 0, points: 5 },
        
        // === ADDITIONAL KANGAROO-STYLE QUESTIONS ===
        // 3-point questions (Easy)
        { id: 72, question: "A caterpillar climbs 5 cm up a plant during the day, but slides down 2 cm each night. After 4 complete days and nights, how high is the caterpillar?", options: ["8 cm", "10 cm", "12 cm", "14 cm", "20 cm"], correctAnswer: 2, points: 3 },
        { id: 73, question: "Luna has 3 boxes. Each box contains 4 bags, and each bag contains 5 marbles. How many marbles does Luna have in total?", options: ["12", "20", "35", "60", "80"], correctAnswer: 3, points: 3 },
        { id: 74, question: "A magic frog doubles every minute. At 10:00 there is 1 frog. At what time will there be 8 frogs?", options: ["10:02", "10:03", "10:04", "10:08", "10:16"], correctAnswer: 1, points: 3 },
        { id: 75, question: "Kai is 8 years old. His grandmother is 7 times as old as Kai. How old will grandmother be when Kai is 12?", options: ["52", "56", "60", "64", "84"], correctAnswer: 2, points: 3 },
        { id: 76, question: "A baker makes 24 cookies and puts them equally into 6 bags. How many cookies are in each bag?", options: ["3", "4", "5", "6", "8"], correctAnswer: 1, points: 3 },
        { id: 77, question: "In a row of 15 houses, Aisha lives in the middle house. What is the number of her house?", options: ["6", "7", "8", "9", "10"], correctAnswer: 2, points: 3 },
        { id: 78, question: "A train has 6 carriages. Each carriage has 8 windows on each side. How many windows does the whole train have?", options: ["48", "56", "72", "96", "108"], correctAnswer: 3, points: 3 },
        
        // 4-point questions (Medium)
        { id: 79, question: "Milo, Theo, and Freya share some stickers. Milo has twice as many as Theo, and Freya has 5 more than Theo. Together they have 45 stickers. How many does Theo have?", options: ["8", "10", "12", "15", "20"], correctAnswer: 1, points: 4 },
        { id: 80, question: "A clock loses 5 minutes every hour. If it shows the correct time at 8:00 AM, what time will it show when the real time is 12:00 noon?", options: ["11:00", "11:20", "11:40", "11:45", "11:50"], correctAnswer: 2, points: 4 },
        { id: 81, question: "In a garden, there are twice as many roses as tulips, and 12 more daisies than roses. If there are 8 tulips, how many flowers are there in total?", options: ["36", "44", "48", "52", "60"], correctAnswer: 3, points: 4 },
        { id: 82, question: "A snail travels around a square garden with sides of 12 meters. It travels 3 meters per minute. How many minutes does it take to go all the way around?", options: ["12", "14", "16", "18", "48"], correctAnswer: 2, points: 4 },
        { id: 83, question: "Five friends sit in a row. Ivy is not at either end. Rosa is to the right of Ivy. Jade is at the left end. Mira is between Jade and Ivy. Who is at the right end?", options: ["Ivy", "Rosa", "Jade", "Mira", "Olive"], correctAnswer: 4, points: 4 },
        { id: 84, question: "A staircase has 20 steps. Cruz climbs 2 steps, then goes back 1 step, and repeats this pattern. How many moves does he need to reach the top step?", options: ["19", "20", "37", "38", "40"], correctAnswer: 2, points: 4 },
        { id: 85, question: "Iris counts from 1 to 100. How many times does she say a number containing the digit 7?", options: ["10", "11", "19", "20", "21"], correctAnswer: 2, points: 4 },
        { id: 86, question: "A library has 4 shelves. The first shelf has 15 books, and each next shelf has 8 more books than the previous one. How many books are there in total?", options: ["84", "92", "100", "108", "120"], correctAnswer: 3, points: 4 },
        
        // 5-point questions (Hard)
        { id: 87, question: "In a class, each child has either a cat or a dog or both. 15 children have a cat, 12 have a dog, and 5 have both. How many children are in the class?", options: ["17", "20", "22", "27", "32"], correctAnswer: 2, points: 5 },
        { id: 88, question: "A dragon has 3 heads. When one head is cut off, 2 new heads grow. If a knight cuts off 5 heads, how many heads will the dragon have?", options: ["5", "6", "7", "8", "10"], correctAnswer: 3, points: 5 },
        { id: 89, question: "Priya thinks of a number. She doubles it, adds 10, divides by 2, and subtracts 3. The result is 12. What number did Priya think of?", options: ["7", "8", "9", "10", "12"], correctAnswer: 3, points: 5 },
        { id: 90, question: "At a party, everyone shakes hands with everyone else exactly once. There are 28 handshakes in total. How many people are at the party?", options: ["6", "7", "8", "9", "14"], correctAnswer: 2, points: 5 },
        { id: 91, question: "A frog jumps between lily pads numbered 1 to 10 in a row. Each jump is exactly 3 pads forward or 2 pads backward. Starting at pad 1, what is the minimum number of jumps to reach pad 10?", options: ["3", "4", "5", "6", "7"], correctAnswer: 0, points: 5 },
        { id: 92, question: "In a village, every house has a red or blue door. Houses with red doors have 3 windows, and houses with blue doors have 5 windows. There are 20 houses and 76 windows in total. How many houses have red doors?", options: ["8", "10", "12", "14", "16"], correctAnswer: 2, points: 5 },
        { id: 93, question: "A code uses only the digits 1, 2, and 3. Each digit can be used any number of times. How many different 3-digit codes are possible?", options: ["6", "9", "18", "27", "81"], correctAnswer: 3, points: 5 },
        { id: 94, question: "Axel writes all numbers from 1 to 50. How many times does he write the digit 3?", options: ["5", "10", "14", "15", "20"], correctAnswer: 3, points: 5 },
        
        // === KANGAROO 2025 ÉCOLIER QUESTIONS ===
        // 3-point questions (2025)
        { id: 95, question: "Simona writes the numbers 2, 0, 2 and 5 in the boxes: □ + □ - □ + □. In what order should she write them to get the biggest result?", options: ["0, 2, 2, 5", "0, 5, 2, 2", "2, 5, 2, 0", "5, 0, 2, 2", "5, 2, 0, 2"], correctAnswer: 4, points: 3 },
        { id: 96, question: "On a die, opposite sides always add up to 7. If you can see 1, 2, and 3 on a die, what is the sum of the three hidden faces?", options: ["9", "10", "12", "14", "15"], correctAnswer: 4, points: 3 },
        
        // 4-point questions (2025)
        { id: 97, question: "Zara and Axel start at point A on a circle. Zara walks clockwise, Axel walks counter-clockwise. They meet at B, then C, then D, then back at A. These points divide the circle into 4 equal parts. How many times has Axel gone around the circle?", options: ["1", "2", "3", "4", "5"], correctAnswer: 2, points: 4 },
        { id: 98, question: "Hans feeds six sheep a total of 210g of food. Five large sheep each get the same amount, and the small sheep gets twice as much as each large sheep. How much food does the small sheep get?", options: ["50g", "55g", "60g", "65g", "70g"], correctAnswer: 2, points: 4 },
        { id: 99, question: "Priya has 3 cookies, Chloe has 5 cookies, and Felix has 7 cookies. They get 15 more cookies to share so each child ends up with the same number. How many cookies does Priya get added to her plate?", options: ["3", "4", "5", "6", "7"], correctAnswer: 4, points: 4 },
        
        // 5-point questions (2025)
        { id: 100, question: "Jana has toys weighing 22g, 23g, 25g, 34g, and 36g. She wants to divide them into two boxes of equal weight. Which two toys must NOT go in the same box?", options: ["22g and 23g", "22g and 25g", "23g and 25g", "34g and 36g", "22g and 34g"], correctAnswer: 4, points: 5 },
        { id: 101, question: "On a calendar, two shaded boxes in the same column add up to 29. If these boxes are on the same weekday, what day is the 1st of the month?", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], correctAnswer: 0, points: 5 },
        { id: 102, question: "In a number wall, each brick shows the sum of the two bricks below it. The bottom row has 1, 2, 3, 4 from left to right. What is the number at the top of the wall?", options: ["16", "18", "20", "22", "24"], correctAnswer: 2, points: 5 },
        { id: 103, question: "On a balance scale, 2 apples weigh the same as 3 bananas. If 1 apple weighs 15g, what does 1 banana weigh?", options: ["5g", "8g", "10g", "12g", "15g"], correctAnswer: 2, points: 5 },
        
        // === ADDITIONAL 2025-STYLE QUESTIONS ===
        // 3-point questions
        { id: 104, question: "Cruz writes the numbers 1, 3, 5, 7 in boxes: □ × □ - □ × □. What order gives the biggest result?", options: ["1, 7, 3, 5", "7, 5, 1, 3", "7, 5, 3, 1", "5, 7, 1, 3", "3, 7, 1, 5"], correctAnswer: 2, points: 3 },
        { id: 105, question: "A robot moves on a grid: →3, ↑2, ←1, ↑1. How far right and how far up is the robot from the start?", options: ["2 right, 3 up", "3 right, 2 up", "2 right, 2 up", "4 right, 3 up", "1 right, 3 up"], correctAnswer: 0, points: 3 },
        { id: 106, question: "Each shell is worth 5 points and each star is worth 3 points. Which combination gives exactly 19 points?", options: ["2 shells, 3 stars", "3 shells, 2 stars", "1 shell, 5 stars", "4 shells, 0 stars", "2 shells, 4 stars"], correctAnswer: 0, points: 3 },
        { id: 107, question: "On a special die, opposite faces multiply to give 6. If you see faces 1, 2, and 6, what is the sum of the hidden faces?", options: ["6", "8", "9", "10", "12"], correctAnswer: 3, points: 3 },
        { id: 108, question: "A train has 5 carriages numbered 1 to 5. Carriage 3 is in the middle. Carriage 1 is at the front. What carriage is directly behind carriage 2?", options: ["1", "3", "4", "5", "None"], correctAnswer: 1, points: 3 },
        { id: 109, question: "Mia folds a paper strip in half 3 times. How many layers does the folded paper have?", options: ["3", "4", "6", "8", "9"], correctAnswer: 3, points: 3 },
        { id: 110, question: "A clock shows 2:45. The minute hand has moved 90 degrees since the last hour. What time was it at the last hour?", options: ["1:00", "2:00", "2:30", "3:00", "12:00"], correctAnswer: 1, points: 3 },
        
        // 4-point questions
        { id: 111, question: "Four children collect stamps. Vera has 12, Theo has 8, Lena has 16, and Hugo has 4. They share 20 more stamps so everyone has equal amounts. How many stamps does Theo receive?", options: ["5", "7", "9", "11", "13"], correctAnswer: 1, points: 4 },
        { id: 112, question: "In a pet shop, 3 cats eat the same amount as 5 hamsters. Each cat eats 10g per day. How much does each hamster eat?", options: ["2g", "4g", "5g", "6g", "8g"], correctAnswer: 3, points: 4 },
        { id: 113, question: "Two runners start at the same point on a track. Runner A completes 3 laps while Runner B completes 2 laps. They started together and finished at the same time. If B's speed is 8 m/s, what is A's speed?", options: ["10 m/s", "11 m/s", "12 m/s", "14 m/s", "16 m/s"], correctAnswer: 2, points: 4 },
        { id: 114, question: "A farmer has chickens and rabbits. He counts 20 heads and 64 legs. How many rabbits does he have?", options: ["8", "10", "12", "14", "16"], correctAnswer: 2, points: 4 },
        { id: 115, question: "In a number wall, each brick shows the sum of two bricks below. The bottom row is 2, 5, 3. What number is at the top?", options: ["15", "17", "18", "20", "22"], correctAnswer: 0, points: 4 },
        { id: 116, question: "A calendar shows that the 13th is a Friday. What day of the week is the 1st of that month?", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], correctAnswer: 4, points: 4 },
        { id: 117, question: "Lina has coins worth 50¢, 20¢, and 10¢. She uses exactly 3 coins to pay 80¢. Which coins does she use?", options: ["50¢, 20¢, 10¢", "50¢, 10¢, 10¢", "20¢, 20¢, 20¢", "50¢, 20¢, 20¢", "20¢, 20¢, 10¢"], correctAnswer: 0, points: 4 },
        { id: 118, question: "A rectangular garden is 3 times as long as it is wide. The perimeter is 48 meters. What is the width?", options: ["4 m", "5 m", "6 m", "8 m", "12 m"], correctAnswer: 2, points: 4 },
        
        // 5-point questions
        { id: 119, question: "Six children sit in a circle. Each child has some candies. They pass half their candies to the right. After one pass, everyone has 8 candies. How many candies were there in total at the start?", options: ["36", "42", "48", "54", "60"], correctAnswer: 2, points: 5 },
        { id: 120, question: "A wizard's potion doubles every hour. At noon, the cauldron is full. At what time was the cauldron 1/8 full?", options: ["9:00 AM", "10:00 AM", "11:00 AM", "8:00 AM", "7:00 AM"], correctAnswer: 0, points: 5 },
        { id: 121, question: "Kai has weights of 1g, 3g, 9g, and 27g. Using a balance scale (weights can go on either side), what is the lightest weight he CANNOT measure?", options: ["2g", "5g", "14g", "None - he can measure any weight up to 40g", "21g"], correctAnswer: 3, points: 5 },
        { id: 122, question: "In a tournament, every team plays every other team once. There are 28 games in total. How many teams are playing?", options: ["6", "7", "8", "9", "10"], correctAnswer: 2, points: 5 },
        { id: 123, question: "A snail climbs a 10-meter well. Each day it climbs 3m, but each night it slides back 2m. On which day does it reach the top?", options: ["7th", "8th", "9th", "10th", "11th"], correctAnswer: 1, points: 5 },
        { id: 124, question: "Three boxes contain apples. Box A has twice as many as Box B. Box C has 4 more than Box A. Together they have 44 apples. How many are in Box C?", options: ["12", "16", "20", "24", "28"], correctAnswer: 2, points: 5 },
        { id: 125, question: "A secret code replaces each letter with the next letter (A→B, B→C, ... Z→A). If 'DOH' becomes 'EPJ' after one step, what was the original word before 'DOH'?", options: ["CNG", "EPI", "CNF", "DMG", "COG"], correctAnswer: 0, points: 5 },
        { id: 126, question: "Five friends weigh 30kg, 32kg, 35kg, 38kg, and 40kg. They need to use an elevator that holds max 70kg. At least how many trips are needed?", options: ["3", "4", "5", "6", "7"], correctAnswer: 0, points: 5 },
        
        // === KANGAROO 2020 ÉCOLIER QUESTIONS ===
        // 3-point questions (2020)
        { id: 127, question: "Arlo drew a board with 9 squares and wrote numbers starting from 1, adding 3 each time (1, 4, 7, 10, ...). Which number could be in one of the squares?", options: ["14", "17", "20", "22", "24"], correctAnswer: 3, points: 3 },
        
        // 4-point questions (2020)
        { id: 128, question: "Whenever a kangaroo hops up 7 steps, a rabbit hops down 3 steps. They start at step 100. When the kangaroo reaches step 156, what step is the rabbit on?", options: ["73", "76", "79", "82", "85"], correctAnswer: 1, points: 4 },
        { id: 129, question: "Vera, Lena and Rosa have 100 reais together. Vera has twice as much as each friend. After each pays for a movie ticket, Vera has 3 times what both friends have together. How much was the ticket?", options: ["R$ 8", "R$ 10", "R$ 12", "R$ 15", "R$ 20"], correctAnswer: 4, points: 4 },
        
        // 5-point questions (2020)
        { id: 130, question: "Five friends discuss what day it is. Noah: 'Yesterday was Wednesday.' Paulo: 'Tomorrow is Friday.' Diego: 'Day before yesterday was Tuesday.' Ethan: 'Day after tomorrow is Saturday.' Arlo: 'Today is Monday.' One is wrong. Who?", options: ["Noah", "Paulo", "Diego", "Ethan", "Arlo"], correctAnswer: 4, points: 5 },
        { id: 131, question: "Numbers 1-8 are covered by triangles, squares, and a circle. Triangle sum = Square sum. Circle = 1/4 of triangle sum. What is the sum of numbers under triangles and circle?", options: ["18", "19", "20", "21", "22"], correctAnswer: 2, points: 5 },
        { id: 132, question: "Ines paints a parrot's head, tail, and wing using red, blue, or green. Head and tail may match, but wing must differ from both. How many unique paintings are possible?", options: ["3", "6", "9", "12", "15"], correctAnswer: 3, points: 5 },
        { id: 133, question: "Marco and Bruno ate ice cream every vacation day. Each ice cream had 2 or 3 scoops. Marco had 23 scoops total, Bruno had 19. What's the minimum number of vacation days?", options: ["6", "7", "8", "10", "11"], correctAnswer: 2, points: 5 },
        { id: 134, question: "A hotel has floors 1-30, each with rooms 1-20. Room codes join floor and room numbers (e.g., floor 11 room 1 = '111'). Code '111' is confusing (could be floor 1 room 11 or floor 11 room 1). How many confusing codes exist?", options: ["2", "5", "9", "12", "18"], correctAnswer: 4, points: 5 },
        
        // === KANGAROO 2019 BENJAMIN QUESTIONS ===
        // 3-point questions (2019)
        { id: 135, question: "In a nursery group there are 14 girls and 12 boys. Half of the group go for a walk. What is the minimum number of girls that must be in that group?", options: ["5", "4", "3", "2", "1"], correctAnswer: 4, points: 3 },
        { id: 136, question: "In an enclosure, the sum of all kangaroos' ages is 36 years. In two years, all kangaroos together will be 60 years old. How many kangaroos are in the enclosure?", options: ["12", "15", "18", "20", "24"], correctAnswer: 0, points: 3 },
        
        // 4-point questions (2019)
        { id: 137, question: "A die has the six smallest odd numbers (1, 3, 5, 7, 9, 11) on its faces. Rico rolls it three times and adds the results. Which sum is impossible to make?", options: ["3", "19", "21", "29", "35"], correctAnswer: 4, points: 4 },
        { id: 138, question: "In a witch's garden there are 30 animals: dogs, cats, and mice. She changes 6 dogs into cats, then 5 cats into mice. Now there are equal numbers of each. How many cats were there originally?", options: ["4", "5", "9", "10", "11"], correctAnswer: 2, points: 4 },
        
        // 5-point questions (2019)
        { id: 139, question: "Robert makes 5 statements: A) My son Basil has 3 sisters. B) My daughter Ann has 2 brothers. C) Ann has 2 sisters. D) Basil has 2 brothers. E) I have 5 children. One is wrong. Which?", options: ["A", "B", "C", "D", "E"], correctAnswer: 3, points: 5 },
        { id: 140, question: "Emil takes selfies with his 8 cousins. Each cousin appears in 2 or 3 photos. Each photo has exactly 5 cousins. How many selfies does Emil take?", options: ["3", "4", "5", "6", "7"], correctAnswer: 1, points: 5 },
        { id: 141, question: "Linus builds a 4×4×4 cube using 32 white and 32 black small cubes. He arranges them so the surface has as much white as possible. What fraction of the surface is white?", options: ["3/4", "2/3", "1/2", "3/8", "1/4"], correctAnswer: 0, points: 5 },
        
        // === KANGAROO 2018 ÉCOLIER QUESTIONS ===
        // 3-point questions (2018)
        { id: 142, question: "Susanne is 6 years old. Her sister Lisa is 2 years younger. Brother Max is 2 years older than Susanne. How old are the 3 siblings altogether?", options: ["15", "16", "17", "18", "19"], correctAnswer: 3, points: 3 },
        { id: 143, question: "Leonie has stamps for digits 0-9. She stamps the date 15.03.2018. How many different stamps does she use?", options: ["5", "6", "7", "9", "10"], correctAnswer: 1, points: 3 },
        
        // 4-point questions (2018)
        { id: 144, question: "Diana throws 3 darts at a target with two scoring zones. First throw: 12 points. Second throw: 15 points. If the zones are worth 3 and 6 points, and her third throw has 3 darts in the 6-point zone, how many points?", options: ["18", "19", "20", "21", "22"], correctAnswer: 0, points: 4 },
        { id: 145, question: "Felix the rabbit has 20 carrots and eats 2 each day. He ate the 12th carrot on a Wednesday. On which day did he start eating?", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], correctAnswer: 4, points: 4 },
        { id: 146, question: "On 8 flowers, butterflies and dragonflies sit (at most 1 per flower). More than half the flowers are occupied. Butterflies = 2 × dragonflies. How many butterflies?", options: ["2", "3", "4", "5", "6"], correctAnswer: 2, points: 4 },
        
        // 5-point questions (2018)
        { id: 147, question: "To slay a dragon, Mathias cuts off heads. When 3 heads are cut, 1 grows back. After cutting 13 heads total, the dragon dies. How many heads did it have initially?", options: ["8", "9", "10", "11", "12"], correctAnswer: 1, points: 5 },
        { id: 148, question: "A belt has 5 holes, each 2 cm apart. How much longer is the belt when using the 1st hole instead of the 5th?", options: ["4 cm", "8 cm", "10 cm", "16 cm", "20 cm"], correctAnswer: 1, points: 5 },
        
        // === KANGAROO 2017 ÉCOLIER QUESTIONS ===
        // 4-point questions (2017)
        { id: 149, question: "Four apples and one pear weigh as much as three pears. What is correct?", options: ["1 pear = 1 apple", "3 apples = 1 pear", "3 pears = 1 apple", "2 pears = 1 apple", "2 apples = 1 pear"], correctAnswer: 4, points: 4 },
        { id: 150, question: "Balloons are sold in packages of 5, 10, or 25. Marius buys exactly 70 balloons. What is the minimum number of packages?", options: ["3", "4", "5", "6", "7"], correctAnswer: 1, points: 4 },
        { id: 151, question: "13 children registered for a competition, then 19 more joined. Six equally big teams are needed. How many more children are needed?", options: ["1", "2", "3", "4", "5"], correctAnswer: 3, points: 4 },
        { id: 152, question: "David has a stove with 2 hobs to prepare 5 dishes (40, 15, 35, 10, 45 min). He can only remove fully cooked dishes. Minimum time needed?", options: ["60 min", "70 min", "75 min", "80 min", "85 min"], correctAnswer: 2, points: 4 },
        
        // 5-point questions (2017)
        { id: 153, question: "Four brothers ate 11 biscuits total. Everyone ate at least 1, all different amounts. Three brothers ate 9, one of them ate exactly 3. How many did the one who ate most have?", options: ["3", "4", "5", "6", "7"], correctAnswer: 2, points: 5 },
        { id: 154, question: "In a 4×4 table with numbers [1,2,1,3; 4,1,1,2; 1,7,3,2; 2,1,3,1], find the 2×2 square with the greatest sum. What is this sum?", options: ["11", "12", "13", "14", "15"], correctAnswer: 3, points: 5 },
        { id: 155, question: "Susi wants to visit exactly 2 of 4 zoo animals (giraffe, elephant, lion, turtle) but won't start with the lion. How many different visit orders are possible?", options: ["3", "7", "8", "9", "12"], correctAnswer: 3, points: 5 },
        { id: 156, question: "Kate has flowers with 6, 7, 8, and 11 petals. She tears 1 petal from each of 3 different flowers, repeating until impossible. Minimum petals left?", options: ["1", "2", "3", "4", "5"], correctAnswer: 4, points: 5 },
        
        // === KANGAROO 2015 ÉCOLIER QUESTIONS ===
        // 3-point questions (2015)
        { id: 157, question: "If you multiply the digits of 35, you get 15 (3×5=15). What is the sum of the digits of 35?", options: ["2", "4", "6", "7", "8"], correctAnswer: 4, points: 3 },
        
        // 4-point questions (2015)
        { id: 158, question: "Luis has 7 apples and 2 bananas. He gives 2 apples to Jacob, who gives him bananas in return. Now Luis has equal apples and bananas. How many bananas did he get?", options: ["2", "3", "4", "5", "7"], correctAnswer: 1, points: 4 },
        { id: 159, question: "10 runners start a race. At finish, there are 3 more runners behind Thomas than in front of him. In which position did Thomas finish?", options: ["1", "3", "4", "6", "7"], correctAnswer: 2, points: 4 },
        { id: 160, question: "Joseph has a car, teddy, ball, and ship. He arranges them so ship is next to car, and teddy is also next to car. How many different arrangements are possible?", options: ["2", "4", "5", "6", "8"], correctAnswer: 1, points: 4 },
        
        // 5-point questions (2015)
        { id: 161, question: "Numbers 1,2,3,4,9 are placed in a cross pattern. The sum of 3 horizontal numbers equals the sum of 3 vertical numbers. What number is in the middle?", options: ["1", "2", "3", "4", "9"], correctAnswer: 4, points: 5 },
        { id: 162, question: "On a 3×3 grid of dots (9 dots), you can draw squares by joining 4 dots. How many different sizes of squares can you draw?", options: ["0", "1", "2", "3", "4"], correctAnswer: 3, points: 5 },
        { id: 163, question: "Thomas cuts a pig and shark drawing into 3 pieces each (head, middle, tail). He takes 1 head, 1 middle, 1 tail to make new animals. How many different animals can he make?", options: ["2", "3", "4", "5", "8"], correctAnswer: 4, points: 5 },
        { id: 164, question: "Anna baked 24, Berta 25, Charlie 26, David 27, Elisa 28 biscuits by weekend's end. One child has 2×, one 3×, one 4×, one 5×, one 6× their Saturday amount. Who baked most on Saturday?", options: ["Anna", "Berta", "Charlie", "David", "Elisa"], correctAnswer: 2, points: 5 },
        
        // === KANGAROO 2023 ÉCOLIER QUESTIONS ===
        // 3-point questions (2023)
        { id: 165, question: "Anna has 4 discs of different sizes. She builds a tower using 3 discs, where smaller must be on top of bigger. How many different towers can she build?", options: ["1", "2", "4", "5", "6"], correctAnswer: 2, points: 3 },
        
        // 4-point questions (2023)
        { id: 166, question: "Weights of 1,2,3,4,5,6 kg are placed on two scale pans (5 weights) to balance. Which weight is left aside?", options: ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"], correctAnswer: 2, points: 4 },
        { id: 167, question: "North of Street A: 7 houses. East of Street B: 8 houses. South of Street A: 5 houses. How many houses West of Street B?", options: ["4", "5", "6", "7", "8"], correctAnswer: 0, points: 4 },
        { id: 168, question: "8 cars in a ferry queue have 19 people total. Each car has 2 or 3 people. How many cars have exactly 2 people?", options: ["2", "3", "4", "5", "6"], correctAnswer: 3, points: 4 },
        { id: 169, question: "6 beavers and 2 kangaroos stand in a row (8 positions). In every 3 consecutive animals, exactly 1 is a kangaroo. On which position does a kangaroo stand?", options: ["1", "2", "3", "4", "5"], correctAnswer: 2, points: 4 },
        
        // 5-point questions (2023)
        { id: 170, question: "An underground train has stations A-B-C-D-E-F. It goes back and forth, stopping at each. Starting at B toward C, what is the 46th stop?", options: ["A", "B", "C", "D", "E"], correctAnswer: 3, points: 5 },
        { id: 171, question: "Three boys enter a room one after another. Hermann is not first, Felix is not second, Clemens is not third. How many different orders are possible?", options: ["1", "2", "3", "4", "6"], correctAnswer: 1, points: 5 },
        { id: 172, question: "Adam has 9 marbles, Brenda has 9. Together they have 8 white and 10 black. Brenda has twice as many black as white. How many black marbles does Adam have?", options: ["3", "4", "5", "6", "0"], correctAnswer: 1, points: 5 }
    ],
    
    "5-6": [
        // === 3-POINT QUESTIONS ===
        { id: 1, question: "What is 25% of 160?", options: ["25", "35", "40", "45", "64"], correctAnswer: 2, points: 3 },
        { id: 2, question: "Regular hexagon perimeter 42 cm. Side length?", options: ["5 cm", "6 cm", "7 cm", "8 cm", "9 cm"], correctAnswer: 2, points: 3 },
        { id: 3, question: "Which fraction is largest?", options: ["2/5", "3/8", "1/2", "4/9", "5/12"], correctAnswer: 2, points: 3 },
        { id: 4, question: "Sum of triangle's interior angles?", options: ["90°", "120°", "150°", "180°", "360°"], correctAnswer: 3, points: 3 },
        { id: 5, question: "If 3x = 24, what is x + 5?", options: ["8", "10", "12", "13", "29"], correctAnswer: 3, points: 3 },
        { id: 6, question: "20% discount on $45. Sale price?", options: ["$9", "$25", "$35", "$36", "$40"], correctAnswer: 3, points: 3 },
        { id: 7, question: "Triangle: base 12 cm, height 8 cm. Area?", options: ["20 cm²", "40 cm²", "48 cm²", "64 cm²", "96 cm²"], correctAnswer: 2, points: 3 },
        { id: 8, question: "Two consecutive integers multiply to 72. Sum?", options: ["15", "16", "17", "18", "19"], correctAnswer: 2, points: 3 },
        { id: 9, question: "0.125 as fraction in lowest terms?", options: ["1/4", "1/6", "1/8", "1/10", "1/12"], correctAnswer: 2, points: 3 },
        { id: 10, question: "Square area 81 cm². Perimeter?", options: ["18 cm", "27 cm", "36 cm", "40.5 cm", "81 cm"], correctAnswer: 2, points: 3 },
        { id: 11, question: "What is 5³?", options: ["15", "25", "75", "125", "243"], correctAnswer: 3, points: 3 },
        { id: 12, question: "Car at 60 km/h for 2.5 hours. Distance?", options: ["120 km", "130 km", "140 km", "150 km", "180 km"], correctAnswer: 3, points: 3 },
        { id: 13, question: "GCD of 24 and 36?", options: ["4", "6", "8", "12", "24"], correctAnswer: 3, points: 3 },
        { id: 14, question: "Simplify: 2/3 + 1/4", options: ["3/7", "3/12", "8/12", "11/12", "1"], correctAnswer: 3, points: 3 },
        { id: 15, question: "Isosceles triangle: two sides 10 cm, base 12 cm. Perimeter?", options: ["22 cm", "30 cm", "32 cm", "34 cm", "120 cm"], correctAnswer: 2, points: 3 },
        { id: 16, question: "What is 15% of 80?", options: ["8", "10", "12", "15", "65"], correctAnswer: 2, points: 3 },
        { id: 17, question: "How many prime numbers less than 20?", options: ["6", "7", "8", "9", "10"], correctAnswer: 2, points: 3 },
        { id: 18, question: "Convert 3/4 to percentage:", options: ["34%", "50%", "70%", "75%", "80%"], correctAnswer: 3, points: 3 },
        { id: 19, question: "What is √49 + √16?", options: ["7", "9", "11", "13", "65"], correctAnswer: 2, points: 3 },
        { id: 20, question: "Circle diameter 14 cm. Radius?", options: ["3.5 cm", "7 cm", "14 cm", "28 cm", "44 cm"], correctAnswer: 1, points: 3 },

        // === 4-POINT QUESTIONS ===
        { id: 21, question: "Boys:girls = 3:5. 40 students. Boys?", options: ["12", "15", "18", "24", "25"], correctAnswer: 1, points: 4 },
        { id: 22, question: "Fibonacci: 1, 1, 2, 3, 5, 8, 13, ... Next?", options: ["15", "18", "20", "21", "26"], correctAnswer: 3, points: 4 },
        { id: 23, question: "240 km in 3 hours. Distance in 5 hours?", options: ["300 km", "360 km", "400 km", "480 km", "720 km"], correctAnswer: 2, points: 4 },
        { id: 24, question: "5 numbers average 12. Remove one, average 10. Removed?", options: ["16", "18", "20", "22", "24"], correctAnswer: 2, points: 4 },
        { id: 25, question: "Rectangle: length = 2×width, perimeter 36 cm. Area?", options: ["54 cm²", "63 cm²", "72 cm²", "81 cm²", "108 cm²"], correctAnswer: 2, points: 4 },
        { id: 26, question: "Primes between 20 and 40?", options: ["3", "4", "5", "6", "7"], correctAnswer: 1, points: 4 },
        { id: 27, question: "3² + 4² - 5 = ?", options: ["15", "18", "20", "25", "44"], correctAnswer: 2, points: 4 },
        { id: 28, question: "Box: 3 red, 5 blue, 2 green. P(blue)?", options: ["1/10", "1/5", "1/2", "3/10", "2/5"], correctAnswer: 2, points: 4 },
        { id: 29, question: "If x - 3 = 2x + 5, x = ?", options: ["-8", "-2", "2", "8", "16"], correctAnswer: 0, points: 4 },
        { id: 30, question: "LCM of 8 and 12?", options: ["4", "12", "24", "48", "96"], correctAnswer: 2, points: 4 },
        { id: 31, question: "Train 100m at 72 km/h. Time to pass pole?", options: ["1 sec", "3 sec", "5 sec", "7 sec", "10 sec"], correctAnswer: 2, points: 4 },
        { id: 32, question: "Cube side 4 cm. Volume?", options: ["12 cm³", "16 cm³", "48 cm³", "64 cm³", "96 cm³"], correctAnswer: 3, points: 4 },
        { id: 33, question: "Exterior angle of regular pentagon?", options: ["36°", "54°", "60°", "72°", "108°"], correctAnswer: 3, points: 4 },
        { id: 34, question: "Simple interest: $1000, 5%, 2 years?", options: ["$50", "$100", "$105", "1050", "$1100"], correctAnswer: 1, points: 4 },
        { id: 35, question: "How many edges on a cube?", options: ["6", "8", "10", "12", "14"], correctAnswer: 3, points: 4 },

        // === 5-POINT QUESTIONS ===
        { id: 36, question: "4×4 grid: 1,2,3,4 in each row/column. Top-left=1, below=3. Sum of other two in first column?", options: ["5", "6", "7", "8", "9"], correctAnswer: 1, points: 5 },
        { id: 37, question: "Divisible by 4 and 6, smallest > 50?", options: ["52", "54", "56", "60", "72"], correctAnswer: 3, points: 5 },
        { id: 38, question: "Anna eats 1/3 pizza. Ben eats 1/4 of rest. Carol eats rest. Carol's fraction?", options: ["1/3", "5/12", "1/2", "7/12", "2/3"], correctAnswer: 2, points: 5 },
        { id: 39, question: "Two numbers: sum 50, product 600. Larger?", options: ["20", "25", "30", "35", "40"], correctAnswer: 2, points: 5 },
        { id: 40, question: "3-digit palindromes count?", options: ["81", "90", "99", "100", "900"], correctAnswer: 1, points: 5 },
        { id: 41, question: "Arrangements of MATH?", options: ["12", "16", "20", "24", "36"], correctAnswer: 3, points: 5 },
        { id: 42, question: "Cone: radius 3 cm, height 4 cm. Slant height?", options: ["3 cm", "4 cm", "5 cm", "6 cm", "7 cm"], correctAnswer: 2, points: 5 },
        { id: 43, question: "Ratio 3:7, difference 20. Smaller number?", options: ["12", "15", "18", "21", "28"], correctAnswer: 1, points: 5 },
        { id: 44, question: "Sum of first 10 natural numbers?", options: ["45", "50", "55", "60", "100"], correctAnswer: 2, points: 5 },
        { id: 45, question: "A tank fills in 6 hours. How much in 2 hours?", options: ["1/4", "1/3", "1/2", "2/3", "3/4"], correctAnswer: 1, points: 5 },
        
        // === ADDITIONAL QUESTIONS ===
        { id: 46, question: "What is the greatest common factor of 48 and 72?", options: ["6", "8", "12", "24", "36"], correctAnswer: 3, points: 3 },
        { id: 47, question: "The average of 5 numbers is 40. Their sum is?", options: ["8", "35", "45", "200", "400"], correctAnswer: 3, points: 3 },
        { id: 48, question: "How many degrees in each angle of a regular hexagon?", options: ["90°", "108°", "120°", "135°", "150°"], correctAnswer: 2, points: 4 },
        { id: 49, question: "Express 0.375 as a fraction in lowest terms:", options: ["3/8", "3/7", "5/8", "37/100", "375/1000"], correctAnswer: 0, points: 3 },
        { id: 50, question: "A price increased by 25%, then decreased by 20%. Net change?", options: ["5% decrease", "0%", "5% increase", "10% increase", "45% increase"], correctAnswer: 1, points: 5 },
        { id: 51, question: "What is the median of: 3, 7, 9, 12, 15?", options: ["7", "8", "9", "10", "12"], correctAnswer: 2, points: 3 },
        { id: 52, question: "If 40% of N is 28, what is N?", options: ["11.2", "68", "70", "112", "280"], correctAnswer: 2, points: 4 },
        { id: 53, question: "The ratio of boys to girls is 5:3. There are 40 students. Boys?", options: ["15", "20", "24", "25", "30"], correctAnswer: 3, points: 4 },
        { id: 54, question: "What is 2⁴ × 2³?", options: ["2⁷", "2¹²", "4⁷", "8⁴", "16³"], correctAnswer: 0, points: 3 },
        { id: 55, question: "A circle has circumference 62.8 cm. Diameter? (π ≈ 3.14)", options: ["10 cm", "15 cm", "20 cm", "25 cm", "31.4 cm"], correctAnswer: 2, points: 4 }
    ],
    
    "7-8": [
        // === 3-POINT QUESTIONS ===
        { id: 1, question: "Simplify: 2(3x - 4) - (x - 5)", options: ["5x - 3", "5x - 13", "5x + 3", "7x - 3", "7x - 13"], correctAnswer: 0, points: 3 },
        { id: 2, question: "What is 2⁵?", options: ["10", "16", "25", "32", "64"], correctAnswer: 3, points: 3 },
        { id: 3, question: "If a = -3, what is a² - 2a?", options: ["3", "9", "12", "15", "21"], correctAnswer: 3, points: 3 },
        { id: 4, question: "Triangle angles 55° and 65°. Third angle?", options: ["50°", "55°", "60°", "65°", "70°"], correctAnswer: 2, points: 3 },
        { id: 5, question: "P(rolling > 4 on die)?", options: ["1/6", "1/3", "1/2", "2/3", "4/6"], correctAnswer: 1, points: 3 },
        { id: 6, question: "Ratio 3:5 as percentage?", options: ["35%", "50%", "60%", "75%", "150%"], correctAnswer: 2, points: 3 },
        { id: 7, question: "Slope through (0,0) and (4,8)?", options: ["1/2", "1", "2", "4", "8"], correctAnswer: 2, points: 3 },
        { id: 8, question: "Solve: 2x + 7 = 15", options: ["x = 3", "x = 4", "x = 5", "x = 8", "x = 11"], correctAnswer: 1, points: 3 },
        { id: 9, question: "Circle diameter 14 cm. Radius?", options: ["3.5 cm", "7 cm", "14 cm", "28 cm", "44 cm"], correctAnswer: 1, points: 3 },
        { id: 10, question: "|-7| + |-3| = ?", options: ["-10", "-4", "4", "10", "21"], correctAnswer: 3, points: 3 },
        { id: 11, question: "Simplify: 3x + 2y - x + 5y", options: ["2x + 7y", "4x + 7y", "2x + 3y", "4x + 3y", "3x + 7y"], correctAnswer: 0, points: 3 },
        { id: 12, question: "√144 = ?", options: ["11", "12", "13", "14", "72"], correctAnswer: 1, points: 3 },
        { id: 13, question: "y = 3x + 2, x = 4. y = ?", options: ["9", "12", "14", "17", "38"], correctAnswer: 2, points: 3 },
        { id: 14, question: "40% as fraction (lowest terms)?", options: ["4/10", "2/5", "4/5", "1/4", "2/4"], correctAnswer: 1, points: 3 },
        { id: 15, question: "Supplement of 65°?", options: ["25°", "65°", "90°", "115°", "295°"], correctAnswer: 3, points: 3 },
        { id: 16, question: "Solve: 5x - 3 = 2x + 9", options: ["x = 2", "x = 3", "x = 4", "x = 5", "x = 6"], correctAnswer: 2, points: 3 },
        { id: 17, question: "What is (-2)³?", options: ["-8", "-6", "6", "8", "-2"], correctAnswer: 0, points: 3 },
        { id: 18, question: "Complementary angle to 35°?", options: ["35°", "45°", "55°", "65°", "145°"], correctAnswer: 2, points: 3 },
        { id: 19, question: "Evaluate: 2 × 3²", options: ["12", "18", "36", "64", "81"], correctAnswer: 1, points: 3 },
        { id: 20, question: "If 3x = 15, what is 2x + 1?", options: ["9", "10", "11", "12", "31"], correctAnswer: 2, points: 3 },

        // === 4-POINT QUESTIONS ===
        { id: 21, question: "Price +20%, then -20%. Net change?", options: ["Same", "4% less", "4% more", "10% less", "10% more"], correctAnswer: 1, points: 4 },
        { id: 22, question: "x + y = 7, x - y = 3. xy = ?", options: ["6", "8", "10", "12", "21"], correctAnswer: 2, points: 4 },
        { id: 23, question: "Triangle 5, 12, 13. Type?", options: ["Acute", "Right", "Obtuse", "Isosceles", "Equilateral"], correctAnswer: 1, points: 4 },
        { id: 24, question: "Integers between √50 and √200?", options: ["5", "6", "7", "8", "9"], correctAnswer: 2, points: 4 },
        { id: 25, question: "Bag: 3 red, 4 blue, 5 green. P(blue)?", options: ["1/4", "1/3", "4/12", "5/12", "1/2"], correctAnswer: 1, points: 4 },
        { id: 26, question: "Regular polygon exterior angle 45°. Sides?", options: ["5", "6", "7", "8", "9"], correctAnswer: 3, points: 4 },
        { id: 27, question: "Solve: 3(2x - 1) = 5x + 4", options: ["x = -1", "x = 1", "x = 5", "x = 7", "x = 11"], correctAnswer: 3, points: 4 },
        { id: 28, question: "Circle radius 7 cm. Area? (π = 22/7)", options: ["44 cm²", "88 cm²", "154 cm²", "308 cm²", "616 cm²"], correctAnswer: 2, points: 4 },
        { id: 29, question: "If 2ˣ = 64, x = ?", options: ["4", "5", "6", "7", "8"], correctAnswer: 2, points: 4 },
        { id: 30, question: "5 numbers mean 8. Add one more, mean 9. New number?", options: ["9", "10", "12", "14", "16"], correctAnswer: 3, points: 4 },
        { id: 31, question: "Simplify: (x² - 4)/(x - 2)", options: ["x - 2", "x + 2", "x² - 2", "x/2", "2x"], correctAnswer: 1, points: 4 },
        { id: 32, question: "Survey: 60% chose A. 45 chose A. Total surveyed?", options: ["27", "60", "75", "90", "105"], correctAnswer: 2, points: 4 },
        { id: 33, question: "Pentagon interior angles sum?", options: ["360°", "450°", "540°", "720°", "900°"], correctAnswer: 2, points: 4 },
        { id: 34, question: "Simplify: 2³ × 2⁴", options: ["2⁷", "2¹²", "4⁷", "4¹²", "8⁷"], correctAnswer: 0, points: 4 },
        { id: 35, question: "If f(x) = 2x - 3, f(5) = ?", options: ["2", "5", "7", "10", "13"], correctAnswer: 2, points: 4 },

        // === 5-POINT QUESTIONS ===
        { id: 36, question: "Two-digit = 7× digit sum. Subtract 27, digits reverse. Number?", options: ["21", "42", "63", "84", "96"], correctAnswer: 2, points: 5 },
        { id: 37, question: "5 students line up. Ways?", options: ["20", "25", "60", "100", "120"], correctAnswer: 4, points: 5 },
        { id: 38, question: "5m ladder, foot 3m from wall. Height on wall?", options: ["2 m", "3 m", "4 m", "5 m", "8 m"], correctAnswer: 2, points: 5 },
        { id: 39, question: "Two numbers: sum 20, sum of squares 208. Product?", options: ["91", "96", "99", "104", "108"], correctAnswer: 1, points: 5 },
        { id: 40, question: "Train: 60 km/h one way, 40 km/h return. Average speed?", options: ["45 km/h", "48 km/h", "50 km/h", "52 km/h", "55 km/h"], correctAnswer: 1, points: 5 },
        { id: 41, question: "4-digit numbers with all distinct digits?", options: ["4032", "4536", "5040", "6480", "9000"], correctAnswer: 1, points: 5 },
        { id: 42, question: "Cone and cylinder: same base and height. Volume ratio?", options: ["1:2", "1:3", "2:3", "3:1", "3:2"], correctAnswer: 1, points: 5 },
        { id: 43, question: "x² - 5x + k = 0 roots in ratio 2:3. k = ?", options: ["4", "5", "6", "7", "8"], correctAnswer: 2, points: 5 },
        { id: 44, question: "AP: first term 3, common diff 4, 10 terms. Sum?", options: ["180", "200", "210", "220", "240"], correctAnswer: 2, points: 5 },
        { id: 45, question: "How many factors does 36 have?", options: ["6", "7", "8", "9", "10"], correctAnswer: 3, points: 5 },
        
        // === ADDITIONAL QUESTIONS ===
        { id: 46, question: "Solve: 3x - 7 = 2x + 5", options: ["x = -12", "x = -2", "x = 2", "x = 12", "x = 15"], correctAnswer: 3, points: 3 },
        { id: 47, question: "What is the value of |-5| + |3| - |-2|?", options: ["0", "4", "6", "8", "10"], correctAnswer: 2, points: 3 },
        { id: 48, question: "A 30-60-90 triangle has short leg 5. Hypotenuse?", options: ["5√2", "5√3", "10", "10√3", "15"], correctAnswer: 2, points: 4 },
        { id: 49, question: "What percent of 80 is 20?", options: ["15%", "20%", "25%", "40%", "400%"], correctAnswer: 2, points: 3 },
        { id: 50, question: "Simplify: (3x²y)(2xy³)", options: ["5x³y⁴", "6x³y⁴", "6x²y³", "5x²y³", "6xy"], correctAnswer: 1, points: 4 },
        { id: 51, question: "In similar triangles, sides are 3:5. Area ratio?", options: ["3:5", "6:10", "9:15", "9:25", "27:125"], correctAnswer: 3, points: 5 },
        { id: 52, question: "What is the slope of 3x + 4y = 12?", options: ["-4/3", "-3/4", "3/4", "4/3", "3"], correctAnswer: 1, points: 4 },
        { id: 53, question: "If f(x) = x² - 4x + 3, find f(5).", options: ["3", "8", "12", "18", "28"], correctAnswer: 1, points: 3 },
        { id: 54, question: "How many terms in the arithmetic sequence 5, 9, 13, ... 101?", options: ["23", "24", "25", "26", "27"], correctAnswer: 2, points: 5 },
        { id: 55, question: "The diagonal of a square is 10 cm. Side length?", options: ["5 cm", "5√2 cm", "10/√2 cm", "7.07 cm", "Both B and C"], correctAnswer: 4, points: 4 }
    ],
    
    "9-10": [
        // === 3-POINT QUESTIONS ===
        { id: 1, question: "Factor: x² - 9", options: ["(x-3)²", "(x+3)²", "(x-3)(x+3)", "x(x-9)", "(x-1)(x-9)"], correctAnswer: 2, points: 3 },
        { id: 2, question: "log₂(32) = ?", options: ["3", "4", "5", "6", "16"], correctAnswer: 2, points: 3 },
        { id: 3, question: "Right triangle: one acute 35°. Other acute?", options: ["35°", "45°", "55°", "65°", "145°"], correctAnswer: 2, points: 3 },
        { id: 4, question: "Solve: x² = 49", options: ["x = 7", "x = -7", "x = ±7", "x = 49", "x = ±49"], correctAnswer: 2, points: 3 },
        { id: 5, question: "sin 30° = ?", options: ["0", "1/2", "√2/2", "√3/2", "1"], correctAnswer: 1, points: 3 },
        { id: 6, question: "Simplify: (2³)²", options: ["2⁵", "2⁶", "4⁶", "8²", "6²"], correctAnswer: 1, points: 3 },
        { id: 7, question: "Midpoint of (2,4) and (8,10)?", options: ["(4, 6)", "(5, 7)", "(6, 8)", "(3, 5)", "(10, 14)"], correctAnswer: 1, points: 3 },
        { id: 8, question: "Domain of f(x) = 1/(x-3)?", options: ["All reals", "x ≠ 0", "x ≠ 3", "x > 3", "x < 3"], correctAnswer: 2, points: 3 },
        { id: 9, question: "(a+b)² = ?", options: ["a² + b²", "a² - b²", "a² + ab + b²", "a² + 2ab + b²", "2a + 2b"], correctAnswer: 3, points: 3 },
        { id: 10, question: "Solve: |2x - 6| = 10", options: ["x = 2", "x = 8", "x = 2 or 8", "x = -2 or 8", "x = -2 or -8"], correctAnswer: 3, points: 3 },
        { id: 11, question: "cos 60° = ?", options: ["0", "1/2", "√2/2", "√3/2", "1"], correctAnswer: 1, points: 3 },
        { id: 12, question: "Simplify √72", options: ["6√2", "8√3", "12√2", "36√2", "2√18"], correctAnswer: 0, points: 3 },
        { id: 13, question: "y = 2x - 3 has slope:", options: ["-3", "-2", "2", "3", "-3/2"], correctAnswer: 2, points: 3 },
        { id: 14, question: "3! + 4! = ?", options: ["7", "12", "24", "30", "144"], correctAnswer: 3, points: 3 },
        { id: 15, question: "f(x) = 2x + 1. f(3) = ?", options: ["4", "5", "6", "7", "8"], correctAnswer: 3, points: 3 },
        { id: 16, question: "tan 45° = ?", options: ["0", "1/2", "1", "√2", "√3"], correctAnswer: 2, points: 3 },
        { id: 17, question: "Simplify: x⁵ ÷ x²", options: ["x³", "x⁷", "x²·⁵", "x¹⁰", "x"], correctAnswer: 0, points: 3 },
        { id: 18, question: "Distance from (0,0) to (3,4)?", options: ["3", "4", "5", "7", "25"], correctAnswer: 2, points: 3 },
        { id: 19, question: "If 5ˣ = 125, x = ?", options: ["2", "3", "4", "5", "25"], correctAnswer: 1, points: 3 },
        { id: 20, question: "Simplify: (x + 2)(x - 2)", options: ["x² - 4", "x² + 4", "x² - 2x", "x² + 4x + 4", "2x"], correctAnswer: 0, points: 3 },

        // === 4-POINT QUESTIONS ===
        { id: 21, question: "Sum of roots: x² - 5x + 6 = 0", options: ["2", "3", "5", "6", "11"], correctAnswer: 2, points: 4 },
        { id: 22, question: "Circle center (2,3) through (5,7). Radius?", options: ["3", "4", "5", "6", "7"], correctAnswer: 2, points: 4 },
        { id: 23, question: "f(x) = 3x - 2. f(f(2)) = ?", options: ["4", "8", "10", "12", "16"], correctAnswer: 2, points: 4 },
        { id: 24, question: "Choose 2 from 6 distinct items. Ways?", options: ["6", "12", "15", "30", "36"], correctAnswer: 2, points: 4 },
        { id: 25, question: "Vertex of y = (x-2)² + 3?", options: ["(2, 3)", "(-2, 3)", "(2, -3)", "(-2, -3)", "(3, 2)"], correctAnswer: 0, points: 4 },
        { id: 26, question: "Period of y = sin(2x)?", options: ["π/2", "π", "2π", "4π", "1"], correctAnswer: 1, points: 4 },
        { id: 27, question: "tan θ = 3/4 (Q1). sin θ = ?", options: ["3/4", "3/5", "4/5", "4/3", "5/3"], correctAnswer: 1, points: 4 },
        { id: 28, question: "Solve: 2^(x+1) = 16", options: ["x = 2", "x = 3", "x = 4", "x = 7", "x = 8"], correctAnswer: 1, points: 4 },
        { id: 29, question: "Distance from (3,4) to origin?", options: ["3", "4", "5", "7", "25"], correctAnswer: 2, points: 4 },
        { id: 30, question: "Product of roots: x² - 5x + 6 = 0", options: ["2", "3", "5", "6", "11"], correctAnswer: 3, points: 4 },
        { id: 31, question: "Simplify: (x³)² / x⁴", options: ["x", "x²", "x³", "x⁵", "x⁶"], correctAnswer: 1, points: 4 },
        { id: 32, question: "Range of y = x² + 1?", options: ["y ≥ 0", "y ≥ 1", "y > 1", "All reals", "y ≤ 1"], correctAnswer: 1, points: 4 },
        { id: 33, question: "Hexagon diagonals?", options: ["6", "8", "9", "12", "15"], correctAnswer: 2, points: 4 },
        { id: 34, question: "Solve: log₁₀(x) = 2", options: ["2", "10", "20", "100", "1000"], correctAnswer: 3, points: 4 },
        { id: 35, question: "sin²θ + cos²θ = ?", options: ["0", "1", "2", "sin 2θ", "cos 2θ"], correctAnswer: 1, points: 4 },

        // === 5-POINT QUESTIONS ===
        { id: 36, question: "AP: first 2, last 50, diff 4. Sum?", options: ["312", "325", "338", "351", "364"], correctAnswer: 2, points: 5 },
        { id: 37, question: "Two dice. P(sum = 7)?", options: ["1/12", "1/6", "5/36", "6/36", "7/36"], correctAnswer: 1, points: 5 },
        { id: 38, question: "2ˣ = 8, 3ʸ = 81. x + y = ?", options: ["5", "6", "7", "8", "12"], correctAnswer: 2, points: 5 },
        { id: 39, question: "Line through (1,2), perpendicular to y = 2x + 3. Equation?", options: ["y = -1/2x + 5/2", "y = 2x", "y = -2x + 4", "y = 1/2x + 3/2", "y = -1/2x + 2"], correctAnswer: 0, points: 5 },
        { id: 40, question: "Terms in (a + b)⁶ expansion?", options: ["5", "6", "7", "12", "64"], correctAnswer: 2, points: 5 },
        { id: 41, question: "log₁₀(x) = 2.5. x ≈ ?", options: ["25", "100", "250", "316", "1000"], correctAnswer: 3, points: 5 },
        { id: 42, question: "Sector: radius 6, angle 60°. Area?", options: ["3π", "6π", "12π", "18π", "36π"], correctAnswer: 1, points: 5 },
        { id: 43, question: "GP: 3rd term 12, 6th term 96. First term?", options: ["1", "2", "3", "4", "6"], correctAnswer: 2, points: 5 },
        { id: 44, question: "Quadratic roots -2 and 3. Equation?", options: ["x² - x - 6 = 0", "x² + x - 6 = 0", "x² - x + 6 = 0", "x² + x + 6 = 0", "x² - 5x - 6 = 0"], correctAnswer: 0, points: 5 },
        { id: 45, question: "Circle x² + y² = 25. Point (3, 4) is:", options: ["Inside", "On", "Outside", "Center", "Cannot tell"], correctAnswer: 1, points: 5 },
        
        // === ADDITIONAL QUESTIONS ===
        { id: 46, question: "Solve: x² - 7x + 12 = 0", options: ["x = 2, 6", "x = 3, 4", "x = -3, -4", "x = 1, 12", "x = -2, -6"], correctAnswer: 1, points: 3 },
        { id: 47, question: "What is sin²60° + cos²60°?", options: ["0", "1/2", "1", "√3", "2"], correctAnswer: 2, points: 3 },
        { id: 48, question: "In how many ways can 8 people sit in a row?", options: ["64", "256", "5040", "40320", "16777216"], correctAnswer: 3, points: 4 },
        { id: 49, question: "What is the sum of interior angles of a decagon?", options: ["1080°", "1260°", "1440°", "1620°", "1800°"], correctAnswer: 2, points: 3 },
        { id: 50, question: "If log₃x = 4, then x = ?", options: ["12", "27", "64", "81", "256"], correctAnswer: 3, points: 4 },
        { id: 51, question: "Find the 10th term of GP: 3, 6, 12, 24, ...", options: ["768", "1024", "1536", "3072", "6144"], correctAnswer: 2, points: 4 },
        { id: 52, question: "What is the discriminant of 2x² - 5x + 3 = 0?", options: ["-1", "0", "1", "5", "49"], correctAnswer: 2, points: 4 },
        { id: 53, question: "A cone has radius 3 and height 4. Volume?", options: ["4π", "12π", "16π", "36π", "48π"], correctAnswer: 1, points: 3 },
        { id: 54, question: "How many diagonals in an octagon?", options: ["16", "18", "20", "24", "28"], correctAnswer: 2, points: 4 },
        { id: 55, question: "Solve: 2ˣ⁺¹ = 32", options: ["x = 3", "x = 4", "x = 5", "x = 15", "x = 16"], correctAnswer: 1, points: 5 }
    ],
    
    "11-12": [
        // === 3-POINT QUESTIONS ===
        { id: 1, question: "d/dx[x³ - 2x² + 5x] = ?", options: ["3x² - 4x + 5", "3x² - 2x + 5", "x² - 4x + 5", "3x³ - 4x² + 5x", "3x - 4 + 5"], correctAnswer: 0, points: 3 },
        { id: 2, question: "lim(x→2) (x² - 4)/(x - 2) = ?", options: ["0", "2", "4", "Undefined", "∞"], correctAnswer: 2, points: 3 },
        { id: 3, question: "∫ 4x³ dx = ?", options: ["x⁴ + C", "4x⁴ + C", "12x² + C", "x³ + C", "4x⁴/4 + C"], correctAnswer: 0, points: 3 },
        { id: 4, question: "e⁰ = ?", options: ["0", "1", "e", "∞", "Undefined"], correctAnswer: 1, points: 3 },
        { id: 5, question: "z = 3 + 4i. |z| = ?", options: ["3", "4", "5", "7", "25"], correctAnswer: 2, points: 3 },
        { id: 6, question: "GP: 2, 6, 18, 54, ... 5th term?", options: ["108", "126", "162", "216", "324"], correctAnswer: 2, points: 3 },
        { id: 7, question: "ln(e⁵) = ?", options: ["1", "e", "5", "e⁵", "5e"], correctAnswer: 2, points: 3 },
        { id: 8, question: "d/dx[sin x] = ?", options: ["-sin x", "cos x", "-cos x", "tan x", "sec x"], correctAnswer: 1, points: 3 },
        { id: 9, question: "3×3 matrix A, det(A) = 4. det(2A) = ?", options: ["8", "16", "24", "32", "64"], correctAnswer: 3, points: 3 },
        { id: 10, question: "i² + i⁴ = ? (i = √-1)", options: ["-2", "-1", "0", "1", "2"], correctAnswer: 2, points: 3 },
        { id: 11, question: "d/dx[eˣ] = ?", options: ["xeˣ⁻¹", "eˣ", "e", "xeˣ", "1"], correctAnswer: 1, points: 3 },
        { id: 12, question: "lim(x→∞) 1/x = ?", options: ["-∞", "0", "1", "∞", "Undefined"], correctAnswer: 1, points: 3 },
        { id: 13, question: "∫ cos x dx = ?", options: ["-sin x + C", "sin x + C", "-cos x + C", "tan x + C", "sec x + C"], correctAnswer: 1, points: 3 },
        { id: 14, question: "Inverse of f(x) = 2x + 3?", options: ["(x-3)/2", "(x+3)/2", "2x - 3", "-2x - 3", "3 - 2x"], correctAnswer: 0, points: 3 },
        { id: 15, question: "tan 45° = ?", options: ["0", "1/2", "1", "√2", "√3"], correctAnswer: 2, points: 3 },
        { id: 16, question: "d/dx[ln x] = ?", options: ["1/x", "x", "ln x", "e^x", "1"], correctAnswer: 0, points: 3 },
        { id: 17, question: "∫ 1 dx = ?", options: ["0", "1", "x", "x + C", "C"], correctAnswer: 3, points: 3 },
        { id: 18, question: "sin 90° = ?", options: ["0", "1/2", "√2/2", "√3/2", "1"], correctAnswer: 4, points: 3 },
        { id: 19, question: "d/dx[x²] = ?", options: ["x", "2x", "x²", "2", "2x²"], correctAnswer: 1, points: 3 },
        { id: 20, question: "lim(x→0) sin x / x = ?", options: ["0", "1", "∞", "-1", "Undefined"], correctAnswer: 1, points: 3 },

        // === 4-POINT QUESTIONS ===
        { id: 21, question: "d/dx[ln(x²)] = ?", options: ["1/x²", "2/x", "2x", "1/2x", "x/2"], correctAnswer: 1, points: 4 },
        { id: 22, question: "Sum: 1/2 + 1/4 + 1/8 + ... (infinite)?", options: ["1/2", "3/4", "1", "3/2", "2"], correctAnswer: 2, points: 4 },
        { id: 23, question: "∫₀² 3x² dx = ?", options: ["4", "6", "8", "12", "24"], correctAnswer: 2, points: 4 },
        { id: 24, question: "∫ eˣ dx = ?", options: ["xeˣ + C", "eˣ + C", "eˣ/x + C", "eˣ⁺¹ + C", "ln(eˣ) + C"], correctAnswer: 1, points: 4 },
        { id: 25, question: "u = (1, 2), v = (4, -2). Relationship?", options: ["Parallel", "Perpendicular", "Neither", "Equal", "Opposite"], correctAnswer: 1, points: 4 },
        { id: 26, question: "Arrangements of 'MATH'?", options: ["4", "12", "16", "24", "256"], correctAnswer: 3, points: 4 },
        { id: 27, question: "Tangent to y = x² at x = 3?", options: ["y = 6x - 9", "y = 6x + 9", "y = 3x - 9", "y = 6x - 3", "y = 9x - 6"], correctAnswer: 0, points: 4 },
        { id: 28, question: "f(x) = x³. f''(x) = ?", options: ["3x²", "6x", "6", "x²", "3x"], correctAnswer: 1, points: 4 },
        { id: 29, question: "∫ 1/x dx = ?", options: ["x + C", "ln|x| + C", "-1/x² + C", "1/x² + C", "x² + C"], correctAnswer: 1, points: 4 },
        { id: 30, question: "Angle between (1,0) and (1,1)?", options: ["30°", "45°", "60°", "90°", "120°"], correctAnswer: 1, points: 4 },
        { id: 31, question: "d/dx[x⁴ - 3x² + 2x] = ?", options: ["4x³ - 6x + 2", "4x³ - 3x + 2", "x³ - 6x + 2", "4x⁴ - 6x² + 2", "3x³ - 6x"], correctAnswer: 0, points: 4 },
        { id: 32, question: "∑(i=1 to 5) i = ?", options: ["10", "12", "15", "20", "25"], correctAnswer: 2, points: 4 },
        { id: 33, question: "d/dx[x·eˣ] = ?", options: ["eˣ", "xeˣ", "eˣ + xeˣ", "xeˣ - eˣ", "2xeˣ"], correctAnswer: 2, points: 4 },
        { id: 34, question: "If f(x) = x² + 1, f'(2) = ?", options: ["2", "3", "4", "5", "9"], correctAnswer: 2, points: 4 },
        { id: 35, question: "∫ 2x dx = ?", options: ["2", "x", "x²", "x² + C", "2x² + C"], correctAnswer: 3, points: 4 },

        // === 5-POINT QUESTIONS ===
        { id: 36, question: "lim(x→0) (sin 3x)/(2x) = ?", options: ["0", "2/3", "1", "3/2", "∞"], correctAnswer: 3, points: 5 },
        { id: 37, question: "Area between y = x² and y = x?", options: ["1/3", "1/4", "1/6", "1/2", "1"], correctAnswer: 2, points: 5 },
        { id: 38, question: "P(A) = 0.3, P(B) = 0.4, independent. P(A ∩ B) = ?", options: ["0.10", "0.12", "0.35", "0.70", "1.00"], correctAnswer: 1, points: 5 },
        { id: 39, question: "∫₀^π sin x dx = ?", options: ["0", "1", "2", "π", "-1"], correctAnswer: 2, points: 5 },
        { id: 40, question: "Taylor series of eˣ at x=0 starts:", options: ["1 + x + x²/2 + ...", "x + x²/2 + ...", "1 + x + x² + ...", "x + x² + x³ + ...", "1 + 2x + 3x² + ..."], correctAnswer: 0, points: 5 },
        { id: 41, question: "f(x) = ln(sin x). f'(x) = ?", options: ["cos x / sin x", "1/sin x", "-tan x", "cot x", "sec x"], correctAnswer: 3, points: 5 },
        { id: 42, question: "Volume: y = x² rotated about x-axis, 0 to 2?", options: ["32π/5", "16π/5", "8π", "4π", "2π"], correctAnswer: 0, points: 5 },
        { id: 43, question: "Coefficient of x³ in (1+x)⁵?", options: ["5", "10", "15", "20", "30"], correctAnswer: 1, points: 5 },
        { id: 44, question: "∫ sec²x dx = ?", options: ["tan x + C", "sec x + C", "-cot x + C", "csc x + C", "sin x + C"], correctAnswer: 0, points: 5 },
        { id: 45, question: "d/dx[arctan x] = ?", options: ["1/(1+x²)", "1/(1-x²)", "1/√(1-x²)", "-1/(1+x²)", "x/(1+x²)"], correctAnswer: 0, points: 5 },
        
        // === ADDITIONAL QUESTIONS ===
        { id: 46, question: "Evaluate: lim(x→1) (x³-1)/(x-1)", options: ["0", "1", "2", "3", "undefined"], correctAnswer: 3, points: 3 },
        { id: 47, question: "What is ∫₀¹ x² dx?", options: ["1/4", "1/3", "1/2", "2/3", "1"], correctAnswer: 1, points: 3 },
        { id: 48, question: "If z = 2 - 3i, what is z̄ (conjugate)?", options: ["2 + 3i", "-2 + 3i", "-2 - 3i", "3 - 2i", "3 + 2i"], correctAnswer: 0, points: 3 },
        { id: 49, question: "What is the period of y = 3cos(2x + π)?", options: ["π/2", "π", "2π", "3π", "4π"], correctAnswer: 1, points: 4 },
        { id: 50, question: "How many ways to choose 3 items from 10?", options: ["30", "72", "120", "720", "1000"], correctAnswer: 2, points: 4 },
        { id: 51, question: "If f(x) = e²ˣ, what is f'(x)?", options: ["e²ˣ", "2e²ˣ", "2eˣ", "e²ˣ/2", "2xe²ˣ"], correctAnswer: 1, points: 4 },
        { id: 52, question: "Sum of infinite series: 1 + 1/3 + 1/9 + 1/27 + ...", options: ["1", "4/3", "3/2", "2", "3"], correctAnswer: 2, points: 5 },
        { id: 53, question: "What is the magnitude of vector (3, -4, 0)?", options: ["1", "5", "7", "12", "25"], correctAnswer: 1, points: 3 },
        { id: 54, question: "Solve: e²ˣ = 7", options: ["x = ln7/2", "x = 2ln7", "x = ln(7/2)", "x = 7/e²", "x = ln7 - 2"], correctAnswer: 0, points: 5 },
        { id: 55, question: "What is d/dx[x·ln(x)]?", options: ["1/x", "ln(x)", "1 + ln(x)", "x + ln(x)", "1/x + ln(x)"], correctAnswer: 2, points: 4 }
    ]
};

// Configuration for exam
const examConfig = {
    "1-2": { totalQuestions: 18, easy: 10, medium: 5, hard: 3 },
    "3-4": { totalQuestions: 18, easy: 10, medium: 5, hard: 3 },
    "5-6": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 },
    "7-8": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 },
    "9-10": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 },
    "11-12": { totalQuestions: 20, easy: 10, medium: 6, hard: 4 }
};

// Shuffle function using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to get randomized questions for a specific grade
function getQuestionsForGrade(grade) {
    const allQuestions = questionBank[grade] || [];
    const config = examConfig[grade];
    
    if (!config) return allQuestions;
    
    // Separate questions by difficulty (based on points)
    const easyQuestions = allQuestions.filter(q => q.points === 3);
    const mediumQuestions = allQuestions.filter(q => q.points === 4);
    const hardQuestions = allQuestions.filter(q => q.points === 5);
    
    // Shuffle each category
    const shuffledEasy = shuffleArray(easyQuestions);
    const shuffledMedium = shuffleArray(mediumQuestions);
    const shuffledHard = shuffleArray(hardQuestions);
    
    // Select the required number from each category
    const selectedEasy = shuffledEasy.slice(0, Math.min(config.easy, shuffledEasy.length));
    const selectedMedium = shuffledMedium.slice(0, Math.min(config.medium, shuffledMedium.length));
    const selectedHard = shuffledHard.slice(0, Math.min(config.hard, shuffledHard.length));
    
    // Combine and return (easy first, then medium, then hard)
    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

// Get total question count for display
function getTotalQuestionCount() {
    let total = 0;
    for (const grade in questionBank) {
        total += questionBank[grade].length;
    }
    return total;
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionBank, getQuestionsForGrade, examConfig, getTotalQuestionCount };
}
