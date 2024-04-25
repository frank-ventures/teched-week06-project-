export default function BigAinsleyButton({ increaseAinsleys }) {
  return (
    <img
      className="big-ainsley-button"
      src="/assets/images/ainsley-yeah-boi-cartoon-square.png"
      onClick={increaseAinsleys}
    ></img>
  );
}