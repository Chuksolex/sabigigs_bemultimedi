import React from 'react';
import "./PackageComparisonTable.scss";

const PackageComparisonTable = ({ item, currencyCode }) => {
  const packageTitles = ['Basic', 'Standard', 'Premium'];

  const getTickSymbol = (value) => {
    return value ? (
      <span className="tick good">&#x2713;</span>
    ) : (
      <span className="tick bad">&#x2717;</span>
    );
  };

  return (
    <div className="table-container">
      <table className="package-comparison-table">
        <thead>
          <tr>
            <th className="first-column">Feature</th>
            {packageTitles.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
          <tr>
            <th></th>
            <th>{currencyCode} {item.price_basic}</th>
            <th>{currencyCode} {item.price_standard}</th>
            <th>{currencyCode} {item.price_premium}</th>
          </tr>
        </thead>
        <tbody>
          {item.features_basic.map((feature, index) => (
            <tr key={index}>
              <td>{feature}</td>
              {packageTitles.map((title) => (
                <td key={title}>{getTickSymbol(item[`features_${title.toLowerCase()}`].includes(feature))}</td>
              ))}
            </tr>
          ))}
          {item.features_standard.map((feature, index) => (
            <tr key={index}>
              <td>{feature}</td>
              {packageTitles.map((title) => (
                <td key={title}>{getTickSymbol(item[`features_${title.toLowerCase()}`].includes(feature))}</td>
              ))}
            </tr>
          ))}
          {item.features_premium.map((feature, index) => (
            <tr key={index}>
              <td>{feature}</td>
              {packageTitles.map((title) => (
                <td key={title}>{getTickSymbol(item[`features_${title.toLowerCase()}`].includes(feature))}</td>
              ))}
            </tr>
          ))}

          <tr>            <th>Total Price</th>
            <td>{currencyCode} {item.price_basic}</td>
            <td>{currencyCode} {item.price_standard}</td>
            <td>{currencyCode} {item.price_premium}</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PackageComparisonTable;
