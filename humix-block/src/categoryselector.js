import { SelectControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';


const CategorySelector = withSelect((select) => {
    const { getEntityRecords } = select('core');
    const categories = getEntityRecords('taxonomy', 'category', { per_page: -1 });
    return {
        categories,
    };
})(({ attributes, updateSelectedCategory, categories, disabled }) => {

    let cats = [];
    if (Array.isArray(categories)) {
        cats = categories.map(({ id, name }) => ({ label: getCategoryLabel(name), value: id }));
        cats.unshift({value: -1, label: "All posts in site"});
    }

    function getCategoryLabel(categoryName) {
        if (categoryName === "Uncategorized") {
            return "Posts with no category assigned (Uncategorized)";
        }
        return `Posts assigned the '${categoryName}' category`;
    }

    return (
        <SelectControl
            label="Add this Video to:"
            disabled={disabled}
            value={attributes.category}
            onChange={(category) => updateSelectedCategory(category)}
            options={cats}
        />
    );
});

export default CategorySelector;
