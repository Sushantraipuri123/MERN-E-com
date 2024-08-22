import './CircularText.css';

const CircularText = () => {
  return (
    <svg width="250" height="250" viewBox="0 0 300 300" className='svg-img'>
      {/* Define the circular path */}
      <path
        id="circlePath"
        d="M 150, 150
           m -75, 0
           a 75,75 0 1,1 150,0
           a 75,75 0 1,1 -150,0"
        fill="none"
        stroke="none"
      />
      {/* Attach the text to the path */}
      <text fontSize="18" fill="black" letterSpacing="3">
        <textPath href="#circlePath" startOffset="0%">
          Made by Sushant in 2024
        </textPath>
      </text>
    </svg>
  );
};

export default CircularText;



