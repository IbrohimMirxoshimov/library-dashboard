export interface SeparatorProps {
	className?: string;
}

export interface ContactInfoProps {
	name: string;
	phone: string;
}

export interface BookDetailsProps {
	bookTitle: string;
	returnDate: string;
}

export interface ContactLinksProps {
	website: string;
	phone: string;
	telegram: string;
}

export interface ReceiptFooterProps {
	receiptNumber: string;
	bookNumber: string;
	date: string;
	qrCodeUrl: string;
}

export const Separator: React.FC<SeparatorProps> = () => (
	<div className="separator">
		************
		<style jsx>{`
			.separator {
				text-align: center;
				margin-top: 7px;
			}
		`}</style>
	</div>
);

export const ContactInfo: React.FC<ContactInfoProps> = ({ name, phone }) => (
	<div className="contact-info">
		Aziz kitobxon{" "}
		<span className="highlight">
			{name} (tel: {phone})
		</span>
		<style jsx>{`
			.contact-info {
				font-weight: 500;
				text-align: center;
			}
			.highlight {
				font-weight: 700;
			}
		`}</style>
	</div>
);

export const BookDetails: React.FC<BookDetailsProps> = ({
	bookTitle,
	returnDate,
}) => (
	<div className="book-details">
		Siz Mehr kutubxonasidan <br />
		<span className="highlight">{bookTitle}</span> kitobini o'qish uchun
		vaqtincha ijaraga olyapsiz
		<br />
		<br />
		Kitobni, <span className="highlight">{returnDate}</span> kuni
		qaytarishingiz kerak
		<style jsx>{`
			.book-details {
				font-weight: 500;
				text-align: center;
				margin-top: 7px;
			}
			.highlight {
				font-weight: 700;
			}
		`}</style>
	</div>
);

export const ContactLinks: React.FC<ContactLinksProps> = ({
	website,
	phone,
	telegram,
}) => (
	<div className="contact-links">
		<span className="label">Sayt: </span>
		{website}
		<br />
		<span className="label">Telefon: </span>
		{phone}
		<br />
		<span className="label">Kutubxonachi telegrami: </span>
		<br />
		{telegram}
		<style jsx>{`
			.contact-links {
				font-weight: 700;
				text-align: center;
				margin-top: 7px;
			}
			.label {
				font-weight: 400;
			}
		`}</style>
	</div>
);

export const ReceiptFooter: React.FC<ReceiptFooterProps> = ({
	receiptNumber,
	bookNumber,
	date,
	qrCodeUrl,
}) => (
	<div className="receipt-footer">
		<div className="receipt-numbers">
			#{receiptNumber} #{bookNumber} #{date}
		</div>
		<img
			loading="lazy"
			sizes="(max-width: 638px) 32vw, (max-width: 998px) 21vw, 15vw"
			src={qrCodeUrl}
			alt="Receipt QR Code"
			className="qr-code"
		/>
		<style jsx>{`
			.receipt-footer {
				display: flex;
				margin-top: 8px;
				width: 100%;
				flex-direction: column;
				align-items: center;
				font-size: 13px;
				text-align: center;
			}
			.qr-code {
				aspect-ratio: 2.27;
				object-fit: contain;
				object-position: center;
				width: 100%;
			}
		`}</style>
	</div>
);

export const LibraryReceipt: React.FC = () => {
	return (
		<div className="receipt">
			<div className="receipt-container">
				<h1 className="title">O'qing</h1>
				<div className="content">
					<ContactInfo
						name="Ibrohim Mirxoshimov"
						phone="99 884-35-66"
					/>
					<BookDetails
						bookTitle="Tafsiri hilol 1 juz"
						returnDate="10 kundan keyin - 12 dekabr, chorshanba"
					/>
					<Separator />
					<div className="rules">
						- Kitobga chizish, buklash va shikast yetkazish
						taqiqlanadi
						<br />
						<br />- Toshkent shahridan chiqish mumkin emas
					</div>
					<Separator />
					<div className="warning">
						Iltimos shartnomaga amal qiling va kutubxonaga zarar
						keltirmang
					</div>
					<div className="instructions">
						<span className="normal">
							Iltimos avval to'liq o'qing. Barchasi to'g'ri va
							rozi bo'lsangiz shu chek orqasiga "
						</span>
						tushundim
						<span className="normal">
							" deb yozing va chekni kutubxonachiga qaytaring
						</span>
					</div>
					<Separator />
					<ContactLinks
						website="mehrkutubxonasi.uz"
						phone="+998 90 9359034"
						telegram="@kutubxonachi_1"
					/>
					<Separator />
				</div>
				<ReceiptFooter
					receiptNumber="44599"
					bookNumber="1220"
					date="41223 05.12.2024"
					qrCodeUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/def6dad90c890d4f2764e77b3ea7be38a6f8f77ce8e80c68ec77c7f8eca21800?apiKey=8853a40b0f55404eb3ba11906af548ce&width=201"
				/>
			</div>
			<style jsx>{`
				.receipt {
					background-color: rgba(255, 255, 255, 1);
					display: flex;
					max-width: 219px;
					flex-direction: column;
					overflow: hidden;
					font-family: Fira Sans, sans-serif;
					color: rgba(0, 0, 0, 1);
					font-weight: 700;
					padding: 7px 9px 19px;
				}
				.receipt-container {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.title {
					font-size: 30px;
					text-align: center;
					margin: 0;
				}
				.content {
					display: flex;
					margin-top: 8px;
					width: 100%;
					flex-direction: column;
					font-size: 14px;
					font-weight: 800;
					letter-spacing: -0.28px;
				}
				.rules {
					font-weight: 500;
					margin-top: 7px;
				}
				.warning {
					font-weight: 700;
					text-align: center;
					margin-top: 7px;
				}
				.instructions {
					font-weight: 700;
					text-align: center;
					margin-top: 7px;
				}
				.normal {
					font-weight: 500;
				}
			`}</style>
		</div>
	);
};
