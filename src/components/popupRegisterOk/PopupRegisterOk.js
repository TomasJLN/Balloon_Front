import "../popup/popup.css";

export const PopupRegisterOk = ({ setRegisterOk }) => {
  const handleOk = async (e) => {
    e.preventDefault();
    setRegisterOk(false);
  };

  return (
    <section id="popup-bg" onClick={() => setRegisterOk(false)}>
      <article id="popup-fg" onClick={(e) => e.stopPropagation()}>
        <h2>Usuario verificado correctamente</h2>
        <form id="popup-form" onSubmit={handleOk}>
          <button type="submit" className="generalButton">
            Vale
          </button>
        </form>
      </article>
    </section>
  );
};
