import { downloadImage } from "../../helpers/downloadImage";
import "./qr-ticket.css";
export const QrTicket = ({ q, i }) => {
	return q.qrPicture ? (
		<figure>
			<figcaption>Ref.: {q.qrPicture.split(".")[0]}</figcaption>
			<img
				src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${q.qrPicture}`}
				alt={q.qrPicture}
				className="qr-picture"
				onClick={async (e) => {
					const a = document.createElement("a");
					a.href = await downloadImage(
						`${process.env.REACT_APP_BACKEND_URL}/uploads/${q.qrPicture}`
					);
					a.download = `${q.qrPicture}`;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				}}
			/>
		</figure>
	) : (
		<img
			src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
			alt={q?.qrPicture}
			className="qr-picture"
		/>
	);
};
