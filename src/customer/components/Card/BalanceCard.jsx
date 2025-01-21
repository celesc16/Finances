function BalanceCard() {
  const TypeOfCard = [
    {
      id: 1,
      title: 'Monto Actual',
      number: '$350',
      color: '#445a14',
    },
    {
      id: 2,
      title: 'Objetivo Financiero',
      number: '$3500',
      color: '#445a14',
    },
    {
      id: 3,
      title: 'Ahorros Actual',
      number: '$350',
      color: '#445a14',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {TypeOfCard.map((card) => (
        <div
          key={card.id}
          style={{ backgroundColor: card.color }}
          className="w-full lg:w-62 p-6 rounded-lg shadow-md"
        >
          <h3 className="font-semibold text-lg mb-2">
            {card.title}
          </h3>
          <p className="text-xl">{card.number}</p>
        </div>
      ))}
    </div>
  );
}

export default BalanceCard;
