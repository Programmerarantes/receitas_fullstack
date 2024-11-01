import { useEffect, useState } from "react"
import { RecipeSummary } from "../utils/types"
import * as RecipeAPI from '../utils/api'

interface RecipeIdProps {
    recipeId: string
    onClose: () => void
}

const RecipeModal = ({recipeId, onClose}: RecipeIdProps) => {

    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>()

    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId)
                setRecipeSummary(summaryRecipe)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRecipeSummary()
    }, [recipeId])

    if(!recipeSummary) { 
        return <></>
    }
    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{recipeSummary.title}</h2>
                        <span className="close-btn" onClick={onClose}>
                            &times;
                        </span>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }}/>
                </div>
            </div>
        </>
    )
}

export default RecipeModal