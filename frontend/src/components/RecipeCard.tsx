import { Recipe } from '../utils/types';

interface RecipeCardProps {
    recipe: Recipe
    onClick: () => void
}
const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}

export default RecipeCard