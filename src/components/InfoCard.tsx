import Link from "next/link";

interface InfoCardProps {
  title?: string;
  subtitle?: string;
  uptitle?: string;
  btnText?: string;
  link?: string;
  infos?: any;
  bodyText: string;
}

const InfoCard = ({
  title,
  btnText,
  infos,
  subtitle,
  uptitle,
  link,
  bodyText,
}: InfoCardProps) => {
  return (
    <div className="rounded border p-2 shadow">
      <h5 className="font-light">{uptitle}</h5>

      <h4 className="font-bold">{title}</h4>

      <h5 className="font-normal">{subtitle}</h5>

      <div className="mb-3">{bodyText}</div>

      {btnText && link && (
        <Link href={`${link}`}>
          <button className="btn-primary">{btnText}</button>
        </Link>
      )}
    </div>
  );
};

export default InfoCard;
