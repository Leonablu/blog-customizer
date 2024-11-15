import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';

export const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const handleApply = (params: typeof defaultArticleState) => {
		setArticleParams(params);
	};

	const handleReset = () => {
		setArticleParams(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} onReset={handleReset} />
			<Article />
		</main>
	);
};
