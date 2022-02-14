import { downloadImage } from '../../helpers/downloadImage';

export const QrTicket = ({ q }) => {
  return q.qrPicture ? (
    <img
      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${q.qrPicture}`}
      alt={q.qrPicture?.title}
      className="card-thumbnail"
      onClick={async (e) => {
        const a = document.createElement('a');
        a.href = await downloadImage(
          `${process.env.REACT_APP_BACKEND_URL}/uploads/${q.qrPicture}`
        );
        a.download = `${q.qrPicture}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }}
    />
  ) : (
    <img
      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
      alt={q?.qrPicture}
      className="card-thumbnail"
    />
  );
};
