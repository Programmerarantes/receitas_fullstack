import { Recipe } from "../utils/types"

interface RecipeCardProps {
    recipe: Recipe
}
const RecipeCard = ({ recipe }: RecipeCardProps) => {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}

export default RecipeCard