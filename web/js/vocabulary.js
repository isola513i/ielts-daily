export const TOPICS = [
  { id: 'daily', label: 'ชีวิตประจำวัน', english: 'Everyday life', icon: 'sun', description: 'กิจวัตร สุขภาพ และการใช้ชีวิต' },
  { id: 'work', label: 'การทำงาน', english: 'Work & careers', icon: 'briefcase', description: 'สมัครงาน ประชุม และสื่อสารกับเพื่อนร่วมงาน' },
  { id: 'home', label: 'ที่พักอาศัย', english: 'Home & housing', icon: 'home', description: 'เช่าบ้าน ย้ายที่อยู่ และดูแลที่พัก' },
  { id: 'travel', label: 'การเดินทาง', english: 'Travel & transport', icon: 'compass', description: 'วางแผนทริป จองที่พัก และเดินทาง' },
  { id: 'study', label: 'การเรียนและบริการ', english: 'Study & community', icon: 'book', description: 'เรียนรู้ ติดต่อบริการ และใช้ชีวิตในชุมชน' },
];

// One sense per entry. Keep row order stable: persisted progress uses topic + row IDs.
// term | part of speech | simple English definition | Thai meaning | original example
const entries = {
  daily: `
routine|noun|the usual things you do regularly|กิจวัตร|My morning routine starts with a short walk.
appointment|noun|an arrangement to meet someone at a set time|การนัดหมาย|I have a dentist appointment on Friday afternoon.
habit|noun|something you do often without thinking|นิสัยหรือสิ่งที่ทำเป็นประจำ|Reading before bed is a useful habit.
healthy|adjective|good for your body or mind|ดีต่อสุขภาพ|A healthy breakfast helps me focus at work.
balanced|adjective|having different parts in suitable amounts|สมดุล|I try to eat a balanced diet every day.
prepare|verb|to make something ready for use|เตรียม|I prepare my lunch before leaving the house.
ingredient|noun|one of the foods used to make a dish|ส่วนผสมอาหาร|This recipe needs only five simple ingredients.
portion|noun|an amount of food served to one person|อาหารหนึ่งส่วนที่เสิร์ฟ|Could I have a smaller portion of rice?
fresh|adjective|recently made or collected and still good|สด|We buy fresh vegetables from the local market.
affordable|adjective|not too expensive for you to buy|ที่มีราคาจ่ายไหว|The new shop sells affordable sports equipment.
purchase|verb|to buy something|ซื้อ|You can purchase a ticket at the entrance.
receipt|noun|a document showing that you paid for something|ใบเสร็จรับเงิน|Please keep your receipt if you want a refund.
refund|noun|money returned after you give something back|เงินที่ได้รับคืน|I asked for a refund because the kettle was broken.
exchange|verb|to return a product and get another one|เปลี่ยนสินค้า|Can I exchange this shirt for a larger size?
convenient|adjective|easy to use or suitable for your needs|สะดวก|The shop near my office is very convenient.
available|adjective|ready for someone to use or get|ที่มีให้ใช้หรือหาได้|Fresh bread is available from seven each morning.
recommend|verb|to suggest that someone choose something|แนะนำ|Can you recommend a quiet place for lunch?
prefer|verb|to like one thing more than another|ชอบมากกว่า|I prefer walking to taking the bus.
avoid|verb|to stay away from something or prevent it|หลีกเลี่ยง|I leave early to avoid the morning traffic.
reduce|verb|to make something smaller in amount|ลด|We can reduce waste by using reusable bags.
improve|verb|to make something better|ปรับปรุงให้ดีขึ้น|Regular practice can improve your English vocabulary.
enough|determiner|as much or as many as needed|เพียงพอ|We have enough food for everyone at the table.
instead|adverb|in place of something else|แทน|The cafe was closed, so we cooked at home instead.
occasionally|adverb|sometimes but not often|เป็นครั้งคราว|I occasionally meet friends for coffee after work.
regularly|adverb|often or at repeated times|เป็นประจำ|She exercises regularly at the park near her home.
look after|phrasal verb|to take care of someone or something|ดูแล|My neighbour will look after my cat this weekend.
run out of|phrasal verb|to have no more of something left|ใช้จนหมด|We might run out of milk before breakfast.
pick up|phrasal verb|to collect someone or something|แวะรับหรือไปรับ|I will pick up the groceries on my way home.
household|noun|the people who live together in one home|ครัวเรือน|Each household received a new recycling bin.
well-being|noun|the state of feeling healthy and happy|สุขภาวะหรือความเป็นอยู่ที่ดี|Getting enough sleep is important for your well-being.
`,
  work: `
apply|verb|to formally ask to be considered for a job|สมัครงาน|I plan to apply for a job at the library.
vacancy|noun|a job that is available|ตำแหน่งงานว่าง|The company has a vacancy for an office assistant.
application|noun|a formal request for a job or place|ใบสมัครหรือการสมัคร|Please send your application before the end of June.
qualification|noun|an official record of skills or education|คุณวุฒิหรือวุฒิการศึกษา|A teaching qualification is required for this position.
experience|noun|knowledge gained by doing something|ประสบการณ์|She has three years of experience in customer service.
interview|noun|a meeting to decide if someone suits a job|การสัมภาษณ์งาน|My job interview is scheduled for Monday morning.
employer|noun|a person or organisation that pays people to work|นายจ้าง|My employer provides training for all new staff.
employee|noun|a person who is paid to work|ลูกจ้างหรือพนักงาน|Every employee receives a copy of the handbook.
colleague|noun|a person you work with|เพื่อนร่วมงาน|A colleague helped me finish the report on time.
supervisor|noun|a person who checks and directs your work|หัวหน้างาน|Ask your supervisor if you need extra support.
responsibility|noun|a duty that you are expected to handle|ความรับผิดชอบ|Checking the daily orders is my main responsibility.
task|noun|a piece of work that needs to be done|งานหรือภารกิจหนึ่งอย่าง|Please complete this task before the team meeting.
deadline|noun|the latest time something must be finished|กำหนดส่งงาน|The deadline for the report is next Thursday.
schedule|noun|a plan listing activities and their times|ตารางกำหนดการ|I check my work schedule every Sunday evening.
shift|noun|a period of time when someone works|กะทำงาน|My evening shift starts at four o'clock.
salary|noun|regular money paid for your work|เงินเดือน|The salary is paid on the last working day.
benefit|noun|an extra advantage provided with a job|สวัสดิการ|Flexible working hours are an important employee benefit.
contract|noun|a formal agreement between people or organisations|สัญญา|Read the contract carefully before you sign it.
permanent|adjective|intended to continue for a long time|ประจำหรือถาวร|She is looking for a permanent job in sales.
temporary|adjective|lasting for only a limited period|ชั่วคราว|We hired a temporary assistant for the busy season.
part-time|adjective|involving fewer hours than a full working week|ที่ทำงานไม่เต็มเวลา|I found a part-time job at a local bookshop.
resign|verb|to formally leave your job|ลาออกจากงาน|He decided to resign and return to university.
promotion|noun|a move to a more senior job|การเลื่อนตำแหน่ง|She received a promotion after leading the project.
training|noun|learning the skills needed for a job|การฝึกอบรม|All new staff attend training during their first week.
feedback|noun|comments about how well something was done|ข้อเสนอแนะต่อผลงาน|My manager gave me helpful feedback on the presentation.
efficient|adjective|working well without wasting time or effort|มีประสิทธิภาพ|The new booking system is more efficient.
reliable|adjective|able to be trusted to do what is needed|เชื่อถือได้|We need a reliable person to manage the shop.
cooperate|verb|to work together to achieve something|ร่วมมือ|Both teams need to cooperate on this project.
attend|verb|to be present at an event or meeting|เข้าร่วมหรือเข้าประชุม|Can you attend the meeting on Wednesday afternoon?
put off|phrasal verb|to delay an event or activity|เลื่อนออกไป|We had to put off the meeting until Friday.
`,
  home: `
accommodation|noun|a place where someone stays or lives|ที่พัก|The college can help students find affordable accommodation.
tenant|noun|a person who pays rent to live somewhere|ผู้เช่า|The tenant must keep the shared kitchen clean.
landlord|noun|a person who rents out a property|เจ้าของที่พักที่ให้เช่า|Our landlord arranged for someone to fix the heater.
rent|noun|money paid regularly to use a home|ค่าเช่า|The monthly rent includes water but not electricity.
deposit|noun|money kept as security against damage or loss|เงินประกัน|We paid a deposit before moving into the flat.
lease|noun|an agreement to rent a property for a period|สัญญาเช่า|Our lease ends at the beginning of September.
property|noun|a building and the land it is on|อสังหาริมทรัพย์หรือที่ดินและอาคาร|The property has a small garden at the back.
furnished|adjective|provided with furniture|ที่มีเฟอร์นิเจอร์ให้|We are looking for a furnished flat near work.
spacious|adjective|having plenty of room|กว้างขวาง|The living room is bright and spacious.
shared|adjective|used by more than one person|ที่ใช้ร่วมกัน|There is a shared bathroom on the first floor.
utility|noun|a service such as water or electricity|บริการสาธารณูปโภค|Electricity is a utility that we pay for separately.
bill|noun|a document showing money that you owe|ใบแจ้งหนี้|The electricity bill arrived in the post today.
maintenance|noun|work that keeps something in good condition|การบำรุงรักษา|The building needs regular maintenance throughout the year.
repair|verb|to fix something that is damaged|ซ่อมแซม|Someone will repair the washing machine tomorrow morning.
leak|noun|a hole or crack that lets liquid escape|รอยรั่ว|There is a leak in the pipe under the sink.
heating|noun|a system that makes a building warm|ระบบทำความร้อน|The heating is not working in the bedroom.
appliance|noun|a machine used for a household task|เครื่องใช้ไฟฟ้าในบ้าน|A fridge is an essential appliance in most homes.
neighbour|noun|a person who lives near you|เพื่อนบ้าน|Our neighbour helped us carry the heavy boxes.
neighbourhood|noun|the area around the place where you live|ย่านที่อยู่อาศัย|This neighbourhood has good shops and public transport.
residential|adjective|mainly containing homes rather than businesses|ที่เป็นเขตที่อยู่อาศัย|The flat is on a quiet residential street.
suburb|noun|an area outside the centre of a city|ชานเมือง|They live in a suburb about ten kilometres away.
facility|noun|a place or piece of equipment for a purpose|สิ่งอำนวยความสะดวก|The building has a laundry facility for residents.
entrance|noun|a place where you go into a building|ทางเข้า|Please leave your shoes near the main entrance.
staircase|noun|a set of stairs inside a building|บันไดภายในอาคาร|The staircase leads to two bedrooms upstairs.
storage|noun|space used for keeping things|พื้นที่เก็บของ|There is extra storage under the bed.
move in|phrasal verb|to start living in a new home|ย้ายเข้า|We can move in after the landlord finishes painting.
move out|phrasal verb|to stop living in a home|ย้ายออก|We need to move out by the end of July.
notice|noun|a formal message given before ending an agreement|การแจ้งล่วงหน้า|You must give one month's notice before leaving.
permission|noun|agreement allowing you to do something|การอนุญาต|Ask for permission before painting the bedroom walls.
inspection|noun|a careful check of a place or thing|การตรวจสอบสภาพ|The landlord will arrange an inspection next week.
`,
  travel: `
destination|noun|the place someone is travelling to|จุดหมายปลายทาง|Our final destination is a small town by the sea.
journey|noun|the act of travelling from one place to another|การเดินทางจากที่หนึ่งไปอีกที่หนึ่ง|The train journey takes about two hours.
departure|noun|the act or time of leaving a place|การออกเดินทาง|Please arrive thirty minutes before the departure time.
arrival|noun|the act or time of reaching a place|การมาถึง|Our arrival in London is expected at noon.
itinerary|noun|a plan of a journey including places and times|แผนการเดินทาง|I sent our travel itinerary to my family.
reservation|noun|an arrangement to keep a room or seat for you|การจอง|I would like to confirm my hotel reservation.
fare|noun|the price paid for a journey|ค่าโดยสาร|The bus fare is cheaper with a travel card.
return ticket|noun|a ticket for a journey there and back|ตั๋วไปกลับ|Could I have a return ticket to Brighton?
single ticket|noun|a ticket for a journey in one direction|ตั๋วเที่ยวเดียว|A single ticket is enough because I am staying there.
platform|noun|the area beside a railway track for passengers|ชานชาลา|The next train leaves from platform number three.
timetable|noun|a list showing when transport arrives and leaves|ตารางเวลาเดินรถ|Check the timetable before you leave the house.
delay|noun|a period of waiting longer than expected|ความล่าช้า|There was a short delay because of heavy rain.
cancel|verb|to decide that a planned event will not happen|ยกเลิก|The airline had to cancel our flight this morning.
transfer|verb|to change from one form of transport to another|ต่อรถหรือเปลี่ยนพาหนะ|You need to transfer to another bus at the station.
passenger|noun|a person travelling in a vehicle without driving it|ผู้โดยสาร|Each passenger is allowed one small bag on board.
luggage|noun|bags and suitcases taken on a journey|สัมภาระ|We left our luggage at the hotel reception.
boarding pass|noun|a document allowing you to get on a plane|บัตรผ่านขึ้นเครื่อง|Please show your boarding pass at the gate.
passport|noun|an official document for travel between countries|หนังสือเดินทาง|Keep your passport in a safe place during the trip.
customs|noun|the place where goods entering a country are checked|ด่านศุลกากร|We went through customs after collecting our bags.
declare|verb|to officially report goods brought into a country|สำแดงสิ่งของต่อศุลกากร|You may need to declare food at the border.
insurance|noun|an arrangement that covers certain costs or losses|การประกันภัย|Our travel insurance covers the cost of lost luggage.
currency|noun|the money used in a particular country|สกุลเงิน|You can change currency at the airport.
route|noun|the way taken to reach a place|เส้นทาง|This route avoids the busy city centre.
pedestrian|noun|a person walking rather than travelling in a vehicle|คนเดินเท้า|Drivers must stop for a pedestrian at the crossing.
crossing|noun|a marked place for people to cross a road|ทางข้ามถนน|Use the crossing outside the railway station.
commute|verb|to travel regularly between home and work|เดินทางระหว่างบ้านกับที่ทำงานเป็นประจำ|I commute to work by train every morning.
get on|phrasal verb|to enter a bus or train|ขึ้นรถโดยสารหรือรถไฟ|We need to get on the next bus.
get off|phrasal verb|to leave a bus or train|ลงจากรถโดยสารหรือรถไฟ|Get off the train at the second station.
check in|phrasal verb|to register when arriving at a hotel or airport|ลงทะเบียนเข้าพักหรือขึ้นเครื่อง|We can check in at the hotel after two.
book in advance|phrase|to reserve something before the time you need it|จองล่วงหน้า|It is cheaper to book in advance for this journey.
`,
  study: `
enrol|verb|to officially join a course or school|ลงทะเบียนเรียน|You can enrol in the course next Monday.
course|noun|a series of lessons about a subject|หลักสูตรหรือรายวิชา|This English course runs for twelve weeks.
tuition|noun|teaching provided to a student or small group|การสอนหรือการเรียนการสอน|The college offers extra tuition in the evening.
assignment|noun|a piece of work given to a student|งานที่ได้รับมอบหมายในการเรียน|Our first assignment is due at the end of term.
assessment|noun|a process used to judge someone's skills or progress|การประเมินผล|The speaking assessment takes place on Friday.
certificate|noun|an official document showing an achievement|ประกาศนียบัตรหรือเอกสารรับรอง|You will receive a certificate after completing the course.
lecture|noun|a talk that teaches people about a subject|การบรรยาย|The first lecture begins at nine tomorrow morning.
tutor|noun|a teacher who supports an individual or small group|ครูผู้สอนรายบุคคลหรือกลุ่มเล็ก|My tutor explained how to organise the essay.
revise|verb|to study again before a test|ทบทวนบทเรียน|I revise new vocabulary for ten minutes each day.
research|noun|careful study to find information about a subject|การค้นคว้าหรือการวิจัย|We did some research before writing the report.
resource|noun|something useful for study or another activity|แหล่งข้อมูลหรือทรัพยากร|The library is a useful resource for language learners.
borrow|verb|to take something and return it later|ยืม|You can borrow up to six books at a time.
renew|verb|to extend the time that something can be used|ต่ออายุหรือต่อระยะเวลา|I need to renew my library books online.
membership|noun|the state of belonging to a group or service|การเป็นสมาชิก|Library membership is free for local residents.
register|verb|to put your name on an official list|ลงทะเบียน|Please register at reception before using the computers.
requirement|noun|something that is needed or officially expected|ข้อกำหนดหรือสิ่งจำเป็น|Proof of address is a requirement for this service.
document|noun|a paper or file containing official information|เอกสาร|Please bring a document that shows your current address.
evidence|noun|information that helps show something is true|หลักฐาน|A bank statement can provide evidence of your address.
inquiry|noun|a question or request for information|การสอบถาม|I sent an inquiry about the evening classes.
complaint|noun|a statement that something is wrong or unsatisfactory|ข้อร้องเรียน|I wrote a complaint about the damaged parcel.
request|noun|a polite or formal act of asking for something|คำขอ|The council received our request for another recycling bin.
assistance|noun|help given to someone|ความช่วยเหลือ|Please ask a member of staff for assistance.
volunteer|noun|a person who works without being paid|อาสาสมัคร|A volunteer showed us around the community centre.
community|noun|people who live in the same area|ชุมชน|The community organises a food market every month.
council|noun|a group that manages services in a local area|หน่วยงานบริหารท้องถิ่น|The council collects our recycling every other Tuesday.
public|adjective|provided for or open to everyone|สาธารณะ|There is a public library next to the park.
accessible|adjective|easy for people with different needs to enter or use|ที่เข้าถึงหรือใช้งานได้สะดวก|The new community centre is accessible to wheelchair users.
donate|verb|to give money or things to help others|บริจาค|You can donate old clothes to the local charity shop.
take part|phrase|to join an activity|มีส่วนร่วม|Everyone is welcome to take part in the workshop.
sign up|phrasal verb|to put your name down to join something|สมัครเข้าร่วม|You can sign up for the workshop at reception.
`,
};

export const CARDS = Object.entries(entries).flatMap(([topic, text]) => text.trim().split('\n').map((line, index) => {
  const [term, partOfSpeech, definitionEn, meaningTh, exampleEn] = line.split('|');
  return { id: `${topic}-${String(index + 1).padStart(2, '0')}`, topic, term, partOfSpeech, definitionEn, meaningTh, exampleEn };
}));
