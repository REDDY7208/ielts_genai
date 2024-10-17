import React from 'react';
import './Testimonial.css';

const testimonials1 = [
  {
    name: 'Rachel',
    text: 'The speaking exercises in this app really boosted my confidence. I went from a 6.5 to a 7.5 on my IELTS speaking score!',
    rating: 5
  },
  {
    name: 'Mark',
    text: 'The writing tasks were well-structured, helping me understand essay patterns and score 7.0 on my first attempt',
    rating: 5
  },
  {
    name: 'Sara',
    text: 'The listening section of the app was fantastic. It prepared me to understand various accents, and I scored an 8.0!',
    rating: 5
  },
  {
    name: 'Alex',
    text: 'The reading materials were so helpful. I could finally manage time effectively and scored a 7.5 on my reading test.',
    rating: 5
  },
  {
    name: 'Lina',
    text: 'The detailed feedback on my writing helped me improve from a 6.0 to a 7.5. This app is amazing!',
    rating: 5
  },
  {
    name: 'Tom',
    text: 'I couldn’t believe how realistic the mock tests were. I walked into the exam hall with complete confidence.',
    rating: 5
  },
  {
    name: 'Aisha',
    text: 'The variety of speaking topics prepared me well for the exam. I scored a solid 7.0 after only a month of practice.',
    rating: 5
  },
  {
    name: 'Leo',
    text: 'I highly recommend this app for the listening section. I scored an 8.0, thanks to the varied accents and topics!',
    rating: 5
  },
  {
    name: 'Isla',
    text: 'My writing improved so much with the step-by-step guides. I finally got the band 7 I needed.',
    rating: 5
  },
  {
    name: 'Eli',
    text: 'The reading exercises sharpened my comprehension skills. I was able to finish the section with time to spare!',
    rating: 5
  },
  {
    name: 'Nina',
    text: 'The speaking mock tests made a huge difference. I wasn’t nervous at all during the real exam.',
    rating: 5
  },
  {
    name: 'Zayn',
    text: 'I saw an immediate improvement in my listening score. This app made a huge difference!',
    rating: 5
  }
];


const testimonials2 = [
  {
    name: 'Gabriel',
    text: 'The listening drills were so close to the real exam. I managed to score a fantastic 8.0.',
    rating: 5
  },
  {
    name: 'Sophie',
    text: 'This app helped me structure my writing in a way that caught the examiner’s eye. I scored a 7.5!',
    rating: 5
  },
  {
    name: 'Liam',
    text: 'The mock speaking tests prepared me for the real thing. I achieved a 7.5 on my speaking score!',
    rating: 5
  },
  {
    name: 'Emma',
    text: 'I practiced my listening skills every day, and the hard work paid off with a 7.5 score.',
    rating: 5
  },
  {
    name: 'Mia',
    text: 'Thanks to the detailed writing feedback, I finally managed to achieve the band 7.0 I needed for university.',
    rating: 5
  },
  {
    name: 'Ryan',
    text: 'The reading exercises helped me break down complex passages. Scored a 7.5 in reading!',
    rating: 5
  },
  {
    name: 'Chloe',
    text: 'I loved how the app helped me build my vocabulary for the reading and writing sections. I scored a 7.5!',
    rating: 5
  },
  {
    name: 'Jake',
    text: 'The speaking topics in the app covered everything I faced in the exam. I was so well-prepared.',
    rating: 5
  },
  {
    name: 'Olivia',
    text: 'I used this app to practice every day and got the score I needed in all sections. Highly recommend it!',
    rating: 5
  },
  {
    name: 'Lucas',
    text: 'The reading section tips helped me improve my score from a 6.5 to a 7.5!',
    rating: 5
  },
  {
    name: 'Grace',
    text: 'The listening exercises were a game-changer for me. I felt completely prepared for the IELTS exam.',
    rating: 5
  },
  {
    name: 'Mason',
    text: 'This app made writing essays easy and structured. I felt confident going into the exam!',
    rating: 5
  }
];

const Testimonial = () => {
  const colors1 = ['#F7CE56', '#7253A4','#FE753f', '#5383EC']; 
  const colors2 = ['#FE753f', '#5383EC','#F7CE56', '#7253A4'];

  return (
    <div className="testimonial-container">
  
      <h1 className='testimonial-Head'>What Students Say About IELTSGenAI</h1>
      <div className="testimonial-scroll">
        {testimonials1.concat(testimonials1).map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card"
            style={{ backgroundColor: colors1[index % colors1.length] }}
          >
            <div className="testimonial-rating">
              {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">- {testimonial.name}</p>
          </div>
        ))}
      </div>
      <div className="testimonial-scroll">
        {testimonials2.concat(testimonials2).map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card"
            style={{ backgroundColor: colors2[index % colors2.length] }}
          >
            <div className="testimonial-rating">
              {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
