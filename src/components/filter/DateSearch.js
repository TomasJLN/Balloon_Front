import { lazy, Suspense, useState } from "react";
import { VscCalendar } from "react-icons/vsc";

const DatePicker = lazy(() => import("react-multi-date-picker"));

const DateSearch = ({ searchDate, setSearchDate, datePickerRef }) => {
	const [pickerLoaded, setPickerLoaded] = useState(false);

	const openCalendar = () => {
		setPickerLoaded(true);
		setTimeout(() => datePickerRef.current?.openCalendar(), 0);
	};

	return (
		<div className="dateSearch">
			{pickerLoaded && (
				<Suspense fallback={null}>
					<DatePicker
						value={searchDate}
						onChange={setSearchDate}
						range
						inputClass="custom-input"
						ref={datePickerRef}
						minDate={new Date()}
					/>
				</Suspense>
			)}

			<button
				type="button"
				className="calendar-button"
				onClick={openCalendar}
			>
				<VscCalendar /> Fecha
			</button>
		</div>
	);
};

export default DateSearch;
