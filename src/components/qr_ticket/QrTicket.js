import { downloadImage } from "../../helpers/downloadImage";
import { FaDownload } from "react-icons/fa";
import "./qr-ticket.css";
export const QrTicket = ({ q }) => {
	return q.qrPicture ? (
		<figure className="qrFigure">
			<img
				src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${q.qrPicture}`}
				alt={q.qrPicture}
				className="qr-picture"
				onClick={async (e) => {
					const a = document.createElement("a");
					a.href = await downloadImage(
						`${import.meta.env.VITE_BACKEND_URL}/uploads/${q.qrPicture}`
					);
					a.download = `${q.qrPicture}`;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				}}
			/>
			<figcaption>
				<span>Ref. {q.qrPicture.split(".")[0]}</span>
				<strong>
					<FaDownload /> Descargar
				</strong>
			</figcaption>
		</figure>
	) : (
		<figure className="qrFigure">
			<img
				src={`${import.meta.env.VITE_BACKEND_URL}/uploads/NA.png`}
				alt={q?.qrPicture}
				className="qr-picture"
			/>
			<figcaption>
				<span>QR no disponible</span>
			</figcaption>
		</figure>
	);
};
