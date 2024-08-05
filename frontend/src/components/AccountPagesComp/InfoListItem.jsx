const InfoListItem = ({ label, value }) => {
  return (
    <li>
      <div className="col-1">{label}</div>
      <div className="col-2">{value}</div>
    </li>
  );
};

export default InfoListItem;
