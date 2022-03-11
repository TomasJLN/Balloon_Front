import DatePicker, { DateObject } from "react-multi-date-picker";
import { VscCalendar } from "react-icons/vsc";

const DateSearch = ({ searchDate, setSearchDate, datePickerRef }) => {
	return (
		<div className="dateSearch">
			<DatePicker
				value={searchDate}
				onChange={setSearchDate}
				range
				inputClass="custom-input"
				ref={datePickerRef}
				minDate={new DateObject().subtract(-1, "days")}
			/>

			<VscCalendar
				className="calendar-button"
				onClick={() => datePickerRef.current.openCalendar()}
			/>
		</div>
	);
};

export default DateSearch;
