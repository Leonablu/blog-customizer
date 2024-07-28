import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import { useClose } from '../select/hooks/useClose';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useEnterSubmit } from '../select/hooks/useEnterSubmit';

type ArticleParamsFormProps = {
	onApply: (params: typeof defaultArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const formRef = useRef<HTMLElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: closeMenu,
		rootRef: formRef,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsMenuOpen,
	});

	const handleReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onReset();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (onApply) {
			onApply({
				fontFamilyOption: selectedFont,
				fontSizeOption: selectedFontSize,
				fontColor: selectedFontColor,
				backgroundColor: backgroundColor,
				contentWidth: contentWidth,
			});
		}
		setIsMenuOpen(false);
	};

	return (
		<>
			<div>
				<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
			</div>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='Шрифты'
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name={'Размер шрифта'}
						title={'Размер шрифта'}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
