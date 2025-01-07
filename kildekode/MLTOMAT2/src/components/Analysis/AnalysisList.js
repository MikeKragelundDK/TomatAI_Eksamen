import AnalysisItem from "./AnalysisItem";
import classes from "./AnalysisList.module.css";

function AnalysisList(props) {
  return (
    <ul className={classes.list}>
      {props.analysisItems.map((analysisItem) => (
        <AnalysisItem
          key={analysisItem.id}
          id={analysisItem.id}
          image={analysisItem.imgPath}
          title={analysisItem.title}
          description={analysisItem.description}
          predication={analysisItem.predication}
        />
      ))}
    </ul>
  );
}

export default AnalysisList;
