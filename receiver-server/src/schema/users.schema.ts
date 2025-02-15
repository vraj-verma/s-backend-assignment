import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class PrimaryUser {

    @Prop()
    id: string;

    @Prop()
    user: string;

    @Prop()
    email: string;

    @Prop()
    age: number;

    @Prop()
    class: string;

    @Prop({ type: Date, default: () => new Date() })
    insertedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(PrimaryUser);