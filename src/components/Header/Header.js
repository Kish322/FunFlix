import './Header.css';

const createHeader = () => {
  const header = document.createElement('div');
  header.className = 'header';

  const h1 = document.createElement('h1');
  h1.className = 'rainbow-animation';
  h1.textContent = 'FunFlix';

  header.appendChild(h1);

  return header;
};

const animateHeader = () => {
  const header = document.querySelector('.header');
  const text = header.querySelector('.rainbow-animation');

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  let currentIndex = 0;

  const changeColor = () => {
    text.style.color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
  };

  setInterval(changeColor, 3000);
};

const Header = () => {
  const header = createHeader();
  document.body.appendChild(header);
  animateHeader();
};

export default Header;


