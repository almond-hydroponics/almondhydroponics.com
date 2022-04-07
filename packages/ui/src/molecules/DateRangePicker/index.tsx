import { useState } from 'react';
import { TextField, Box, TextFieldProps } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { MobileDateRangePicker, LocalizationProvider } from '@mui/lab';
import { DateRange } from '@mui/lab/DateRangePicker';
import { DateRangePickerProps } from './interfaces';
import { Modal } from '../../atoms';

const DateRangePicker = ({
	onChange,
	isOpen,
	onClose,
	onDismiss,
}: DateRangePickerProps): JSX.Element => {
	const [value, setValue] = useState<DateRange<Date>>([null, null]);

	const handleRangeChange = (payload: DateRange<Date>) => {
		setValue(() => payload);
	};

	const onSubmit = () => {
		onChange({
			startDate: value[0],
			endDate: value[1],
		});
	};

	const renderDatePicker = () => (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MobileDateRangePicker
				startText="Start date"
				endText="End date"
				value={value}
				onChange={handleRangeChange}
				renderInput={(
					startProps: JSX.IntrinsicAttributes & TextFieldProps,
					endProps: JSX.IntrinsicAttributes & TextFieldProps,
				) => (
					<>
						<TextField {...startProps} variant="outlined" size="small" />
						<Box sx={{ mx: 2 }}> to </Box>
						<TextField {...endProps} variant="outlined" size="small" />
					</>
				)}
			/>
		</LocalizationProvider>
	);

	return (
		<Modal
			isModalOpen={isOpen}
			renderContent={renderDatePicker()}
			onClose={onClose}
			renderDialogText="Select your date range"
			renderHeader="Pick a date"
			submitButtonName="Select range"
			onSubmit={onSubmit}
			onDismiss={onDismiss}
			// disabled={hasError}
		/>
	);
};

export default DateRangePicker;
