const EASY_LEVEL = 0;
const MEDIUM_LEVEL = 1;
const HARD_LEVEL = 2;

const DifficultyLevel = (level_no) => {
    switch (level_no) {
        case EASY_LEVEL:
            return "Easy";
        case MEDIUM_LEVEL:
            return "Medium";
        case HARD_LEVEL:
            return "Hard";
    }
    return "Easy";
}

export default DifficultyLevel;